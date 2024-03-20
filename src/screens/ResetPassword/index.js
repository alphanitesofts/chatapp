import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import Icons from '../../assets/icons';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import OTPInput from '../../components/OTPInput';
import { resetPasswordApi, sendVerificationCode } from '../../api/methods/auth';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { setToastMessage } from '../../redux/actions/actions';
import BackButton from '../../components/BackButton';
import AppGrayButton from '../../components/AppGrayButton';
import newColors from '../../utils/newColors';

const ResetPassword = ({ navigation, route }) => {

    const { receivedCode, email } = route?.params || ""

    const { appTheme } = useSelector(state => state.userSession)
    const dispatch = useDispatch()

    const [details, setDetails] = useState({})
    const [missingField, setMissingField] = useState("")
    const [step, setStep] = useState(1)
    const [receivedOtp, setReceivedOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)

    useEffect(() => {
        setReceivedOtp(receivedCode)
    }, [receivedCode, email])

    // useEffect(() => {
    // if ((details && details?.token?.length === 4) && (step === 1) && (details?.token === receivedOtp)) {
    //     dispatch(setToastMessage({
    //         type: "success",
    //         message: "Code verified successfully"
    //     }))
    //     setTimeout(() => {
    //         setStep((prev) => parseInt(prev + 1))
    //     }, 1000)
    // }
    // else if ((details && details?.token?.length === 4) && (step === 1) && (details?.token !== receivedOtp)) Alert.alert("Wrong OTP")
    // }, [details])

    useEffect(() => {
        if (details.length > 0 && !details.password) setMissingField("password")
        if (details.length > 0 && !details.password_confirmation) setMissingField("password_confirmation")
        else setMissingField("")
    }, [details])

    const getNewCode = async () => {
        setDetails({ ...details, "code": "" })
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("email", email)
            const response = await sendVerificationCode(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setReceivedOtp(response?.data?.token)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const checkInput = () => {
        if (!details?.password) setMissingField("password")
        else if (details?.password && details?.password?.length < 6) setMissingField("password_length")
        else if (!details?.password_confirmation) setMissingField("password_confirmation")
        else if (details?.password !== details?.password_confirmation) setMissingField("not_matched")
        else resetPassword()
    }

    const resetPassword = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("email", email)
            formData.append("token", details?.token)
            formData.append("password", details?.password)
            formData.append("password_confirmation", details?.password_confirmation)
            const response = await resetPasswordApi(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 1500)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <BackButton
                onPress={() => {
                    if (step === 1) navigation.goBack()
                    else setStep((prev) => parseInt(prev - 1))
                }}
                mainContainer={{ marginLeft: 15 }}
            />

            <View style={styles.innerContainer}>
                {step === 1 ? <>

                    <View style={styles.inputContainer}>
                        <Text style={styles.verifyText}>Verify Email</Text>
                        <Text style={styles.messageText}>We Have Sent Code To Your email</Text>
                        <Text style={styles.emailText}>{`${email?.slice(0, 4)}****${email.slice(8)}`}</Text>
                        <OTPInput
                            appTheme={appTheme}
                            onComplete={(code) => setDetails({ ...details, "token": code })}
                        />
                        <AppButton
                            title={"Verify"}
                            mainContainer={{ marginBottom: 15 }}
                            onPress={() => {
                                if ((details && details?.token?.length === 4) && (step === 1) && (details?.token === receivedOtp)) {
                                    dispatch(setToastMessage({
                                        type: "success",
                                        message: "Code verified successfully"
                                    }))
                                    setTimeout(() => {
                                        setStep((prev) => parseInt(prev + 1))
                                    }, 1000)
                                }
                                else if ((details && details?.token?.length === 4) && (step === 1) && (details?.token !== receivedOtp)) Alert.alert("Wrong OTP")
                            }}
                        />
                        <AppGrayButton
                            title={"Send Again"}
                            onPress={() => getNewCode()}
                            mainContainer={{ backgroundColor: newColors.appBackground }}
                        />
                    </View>


                </>
                    :
                    <>

                        <View style={styles.inputContainer}>
                            <Text style={[styles.verifyText, {
                                marginBottom: 20,
                            }]}>Please enter new password</Text>
                            <AppInput
                                placeholder={"Password"}
                                warningMessage={missingField === "password" ? "Please enter password" : missingField === "not_matched" ? "Password not matched" : missingField === "password_length" ? "Password must be alteast 6 characters" : ""}
                                defaultValue={details.password}
                                placeholderTextColor={missingField === "password" ? newColors.warningRed : newColors.appInputText}
                                onChange={(text) => setDetails({ ...details, "password": text })}
                                secureTextEntry={showPassword}
                                iconSource={showPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                                onIconPress={() => setShowPassword(!showPassword)}
                            />
                            <AppInput
                                placeholder={"Confirm password"}
                                warningMessage={missingField === "password_confirmation" ? "Please enter confirm password" : missingField === "not_matched" ? "Password not matched" : ""}
                                defaultValue={details.password_confirmation}
                                placeholderTextColor={missingField === "password" ? newColors.warningRed : newColors.appInputText}
                                onChange={(text) => setDetails({ ...details, "password_confirmation": text })}
                                secureTextEntry={showConfirmPassword}
                                iconSource={showConfirmPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                                onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                mainContainer={{ marginTop: 20 }}
                            />
                            <AppButton
                                title={"Send"}
                                titleAllCaps={true}
                                mainContainer={{ marginTop: 20 }}
                                onPress={() => checkInput()}
                            />
                        </View>
                    </>}
            </View>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView>
    )
}

export default ResetPassword;