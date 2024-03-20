import React, { useEffect, useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { useDispatch, } from 'react-redux';
import styles from './styles';
import Loader from '../../components/Loader';
import { loginApi } from '../../api/methods/auth';
import { loginInResponse, setToastMessage, setUser, userIdResponse } from '../../redux/actions/actions';
import { StackActions } from '@react-navigation/native';
import Icons from '../../assets/icons';
import ToastMessage from '../../components/ToastMessage';
import AppGrayButton from '../../components/AppGrayButton';
import newColors from '../../utils/newColors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const Login = ({ navigation }) => {


    const dispatch = useDispatch()

    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [missingField, setMissingField] = useState("")
    const [showPassword, setShowPassword] = useState(true)

    useEffect(() => {
        if (details.length > 0 && !details.username) setMissingField("username")
        else if (details.length > 0 && !details.password) setMissingField("password")
        else setMissingField("")
    }, [details])

    const checkInput = () => {
        if (!details?.username) setMissingField("username")
        else if (!details.password) setMissingField("password")
        else login()
    }

    const login = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("username", details.username)
            formData.append("password", details.password)
            const response = await loginApi(formData)
            if (response?.data?.status === "200") {
                dispatch(loginInResponse(response?.data?.token))
                dispatch(userIdResponse(response?.data?.User?.id))
                dispatch(setUser(response?.data?.User))
                dispatch(setToastMessage({
                    type: "success",
                    message: "User logged in"
                }))
                setTimeout(() => {
                    navigation.dispatch(StackActions.replace("HomeStack"))
                }, 2000)
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
            <View style={styles.innerContainer}>
                <KeyboardAwareScrollView
                    style={{
                        flexGrow: 1,
                        marginTop:'40%'
                    }}
                >
                    <Text style={styles.heading}>Login Your Account</Text>
                    <AppInput
                        rightIcon={Icons.userIcon}
                        placeholder={"Enter username"}
                        mainContainer={{ marginTop: 20 }}
                        defaultValue={details?.username}
                        warningMessage={missingField === "username" ? "Please enter username" : ""}
                        placeholderTextColor={missingField === "username" ? newColors.warningRed : newColors.appInputText}
                        onChange={(text) => setDetails({ ...details, "username": text })}
                    />
                    <AppInput
                        rightIcon={Icons.lockIcon}
                        placeholder={"Password"}
                        mainContainer={{ marginTop: 20 }}
                        iconSource={showPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                        secureTextEntry={showPassword}
                        warningMessage={missingField === "password" ? "Please enter password" : ""}
                        placeholderTextColor={missingField === "password" ? newColors.warningRed : newColors.appInputText}
                        onChange={(text) => setDetails({ ...details, "password": text })}
                        defaultValue={details?.password}
                        onIconPress={() => setShowPassword(!showPassword)}
                    />
                    <View style={{ width: '100%', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={styles.forgotPasswordContainer}
                            onPress={() => navigation.navigate("ForgotPassword")}
                        >
                            <Text style={styles.forgotPasswordText}>Forget Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    <AppButton
                        title={"Login"}
                        onPress={() => checkInput()}
                    />
                    <Text style={styles.orText}>OR</Text>
                    <AppGrayButton
                        title={"Register Now"}
                        onPress={() => navigation.navigate("Register")}
                    />
                </KeyboardAwareScrollView>
                <Loader
                    loading={loading}
                    isShowIndicator={true}
                />
            </View>
            <ToastMessage />
        </SafeAreaView>
    )
}

export default Login;
