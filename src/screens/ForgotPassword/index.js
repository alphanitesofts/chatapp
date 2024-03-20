import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import styles from './styles';
import Icons from '../../assets/icons';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import Loader from '../../components/Loader';
import { sendVerificationCode } from '../../api/methods/auth';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';
import BackButton from '../../components/BackButton';
import newColors from '../../utils/newColors';

const ForgotPassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const [details, setDetails] = useState({})
    const [missingField, setMissingField] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (details.length > 0 && !details.email) setMissingField("email")
        else setMissingField("")
    }, [details])

    const checkInput = () => {
        if (!details?.email) setMissingField("email")
        else sendCode()
    }

    const sendCode = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("email", details?.email)
            const response = await sendVerificationCode(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setTimeout(() => {
                    navigation.navigate("ResetPassword", { receivedCode: response?.data?.token, email: details?.email })
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
                onPress={() => navigation.goBack()}
                mainContainer={{ marginLeft: 15, marginTop:5 }}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.heading}>Forgot Password</Text>

                <View style={styles.rowContainer}>
                    <View style={styles.inputContainer}>
                        <Text style={{
                            color: newColors.appInputText,
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginBottom: 20,
                            textAlign: 'left'
                        }}>Please enter your email</Text>
                        <AppInput
                            placeholder={"Email"}
                            rightIcon={Icons.emailIcon}
                            warningMessage={missingField === "email" ? "Please enter valid email" : ""}
                            placeholderTextColor={missingField === "email" ? newColors.warningRed : newColors.appInputText}
                            defaultValue={details.email}
                            onChange={(text) => setDetails({ ...details, "email": text })}
                        />
                        <AppButton
                            title={"Send"}
                            titleAllCaps={true}
                            mainContainer={{ marginTop: 20 }}
                            onPress={() => checkInput()}
                        />
                    </View>
                </View>
            </View>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView>
    )
}

export default ForgotPassword;