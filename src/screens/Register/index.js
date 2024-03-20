import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import Icons from '../../assets/icons';
import Loader from '../../components/Loader';
import Picker from '../../components/Picker';
import { fetchAllLanguages, registerApi } from '../../api/methods/auth';
import { loginInResponse, setToastMessage, setUser, userIdResponse } from '../../redux/actions/actions';
import { StackActions } from '@react-navigation/native';
import ToastMessage from '../../components/ToastMessage';
import styles from './styles';
import NewUploadImage from '../../components/NewUploadImage';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import newColors from '../../utils/newColors';

const Register = ({ navigation }) => {

    const dispatch = useDispatch()

    const [step, setStep] = useState(1)
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [pickerLoading, setPickerLoading] = useState(false)
    const [languages, setLanguages] = useState([])
    const [missingField, setMissingField] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)

    useEffect(() => {
        if (details?.length > 0 && !details?.username) setMissingField("username")
        else if (details?.length > 0 && !details?.email) setMissingField("email")
        else if (details?.length > 0 && !details?.password) setMissingField("password")
        else if (details?.length > 0 && !details?.password_confirmation) setMissingField("password_confirmation")
        else setMissingField("")
    }, [details])

    const checkInput = () => {
        if (!details?.username) setMissingField("username")
        else if (!details?.email) setMissingField("email")
        else if (!details?.password) setMissingField("password")
        else if (details?.password && details?.password?.length < 6) setMissingField("password_length")
        else if (!details?.password_confirmation) setMissingField("password_confirmation")
        else if (details?.password !== details?.password_confirmation) setMissingField("not_matched")
        else setStep((value) => parseInt(value + 1))
    }

    const getLanguages = async () => {
        setPickerLoading(true)
        try {
            const response = await fetchAllLanguages()
            if (response.status === 200) {
                if (response?.data?.status === "200") setLanguages(response?.data?.languages)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setPickerLoading(false)
        }
    }

    const register = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("email", details?.email)
            formData.append("username", details?.username)
            formData.append("password", details?.password)
            formData.append("password_confirmation", details?.password_confirmation)
            formData.append("location", details?.location)
            formData.append("language", details?.language)
            formData.append("industry", details?.industry)
            details?.image && formData.append("image", details?.image)
            const response = await registerApi(formData)
            if (response?.data?.status === "200" || response?.data?.response === "200") {
                dispatch(loginInResponse(response?.data?.token))
                dispatch(userIdResponse(response?.data?.user?.id))
                dispatch(setUser(response?.data?.user))
                dispatch(setToastMessage({
                    type: "success",
                    message: "Account created"
                }))
                setTimeout(() => {
                    navigation.dispatch(StackActions.replace('HomeStack'))
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
            <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
            }}>
                <TouchableOpacity style={styles.triangleButtonContainer}
                    onPress={() => {
                        if (step === 1) navigation.goBack()
                        else setStep((prev) => parseInt(prev - 1))
                    }}>
                    <Image
                        source={Icons.arrowIcon}
                        style={{
                            width: 15,
                            height: 15,
                            resizeMode: 'contain',
                            transform: [{ rotate: '270deg' }],
                        }}
                    />
                </TouchableOpacity>

            </View>

            <KeyboardAwareScrollView
                style={{
                    flexGrow: 1,
                    paddingTop: 15
                }}
            >
                <NewUploadImage />
                <View style={styles.innerContainer}>
                    <Text style={styles.heading}>Register Your Account</Text>
                    <View style={styles.inputContainer}>
                        {step === 1 ? <View style={{ width: '100%' }}>
                            <AppInput
                                placeholder={"Username"}

                                defaultValue={details?.username}
                                onChange={(text) => setDetails({ ...details, "username": text })}
                                warningMessage={missingField === "username" ? "Please enter user name" : ""}
                                placeholderTextColor={missingField === "username" ? newColors.warningRed : newColors.appInputText}
                            />
                            <AppInput
                                placeholder={"Email"}
                                mainContainer={{ marginTop: 20 }}
                                defaultValue={details?.email}
                                onChange={(text) => setDetails({ ...details, "email": text })}
                                warningMessage={missingField === "email" ? "Please enter email" : ""}
                                placeholderTextColor={missingField === "email" ? newColors.warningRed : newColors.appInputText}
                            />
                            <AppInput
                                placeholder={"Password"}
                                mainContainer={{ marginTop: 20 }}
                                defaultValue={details?.password}
                                onChange={(text) => setDetails({ ...details, "password": text })}
                                warningMessage={missingField === "password" ? "Please enter password" : missingField === "not_matched" ? "Password not matched" : missingField === "password_length" ? "Password must be alteast 6 characters" : ""}
                                secureTextEntry={showPassword}
                                iconSource={showPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                                placeholderTextColor={missingField === "password" ? newColors.warningRed : newColors.appInputText}
                                onIconPress={() => setShowPassword(!showPassword)}
                            />
                            <AppInput
                                placeholder={"Confirm Password"}
                                mainContainer={{ marginTop: 20 }}
                                defaultValue={details?.password_confirmation}
                                onChange={(text) => setDetails({ ...details, "password_confirmation": text })}
                                warningMessage={missingField === "password_confirmation" ? "Please enter confirm password" : missingField === "not_matched" ? "Password not matched" : ""}
                                secureTextEntry={showConfirmPassword}
                                iconSource={showConfirmPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                                placeholderTextColor={missingField === "password_confirmation" ? newColors.warningRed : newColors.appInputText}
                                onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            />
                        </View> :
                            <Animatable.View style={{ width: '100%' }}
                                animation={step === 2 && "fadeInLeft"}
                                duration={700}
                                delay={500}
                            >
                                <Picker
                                    pickerLoading={pickerLoading}
                                    secondaryTitle={"Language"}
                                    items={languages}
                                    keyToRender={"name"}
                                    defaultValue={details?.language}
                                    keyToCompare={"name"}
                                    onChange={(item) => setDetails({ ...details, "language": item?.name })}
                                    onPickerOpen={() => getLanguages()}
                                />
                                <AppInput
                                    placeholder={"Location"}
                                    mainContainer={{ marginVertical: 20 }}
                                    defaultValue={details?.location}
                                    onChange={(text) => setDetails({ ...details, "location": text })}
                                />
                                <AppInput
                                    placeholder={"Industry"}
                                    defaultValue={details?.industry}
                                    onChange={(text) => setDetails({ ...details, "industry": text })}
                                />
                            </Animatable.View>}
                    </View>
                    <AppButton
                        title={"Next"}
                        mainContainer={{ width: '100%', marginTop: 20 }}
                        onPress={() => {
                            if (step === 1) checkInput()
                            else if (step === 2) register()
                        }}
                    />

                </View>
            </KeyboardAwareScrollView>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView >
    )
}

export default Register;