import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    Linking,
    Pressable,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import AppSwitch from '../../components/AppSwitch';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, setToastMessage, setUser } from '../../redux/actions/actions';
import Loader from '../../components/Loader';
import { StackActions, useIsFocused } from '@react-navigation/native';
import { changePassword, deleteUserBydId, fetchUsersById, updateUserById } from '../../api/methods/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGE_URL } from '../../api/config';
import Icons from '../../assets/icons';
import ToastMessage from '../../components/ToastMessage';
import styles from './styles';
import NewUploadImage from '../../components/NewUploadImage';
import newColors from '../../utils/newColors';
import AppInput from '../../components/AppInput';
import ImageButton from '../../components/ImageButton';

const EditInput = ({
    title,
    needSwitch,
    onPress,
    defaultValue,
    onChange,
    disabled
}) => {
    return (
        <View style={styles.editInputContainer}>
            <Text style={styles.titleText}>{title && title?.toUpperCase()}</Text>
            {needSwitch ? <AppSwitch
                defaultValue={defaultValue}
                mainContainer={{ marginRight: 15 }}
                onChange={(value) => onChange && onChange(value)}
            /> :
                <TouchableOpacity style={styles.arrowButtonContainer} disabled={disabled} onPress={onPress}>
                    <Image
                        source={Icons.rightOrangeArrow}
                        style={{
                            width: 18,
                            height: 10,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>}
        </View>
    )
}

const EditModal = ({
    children,
    onSavePress,
    onContainerPress
}) => {
    return (
        <Pressable style={styles.modalMainContainer} onPress={onContainerPress}>
            <View style={styles.modalBorderContainer}>
                {children}
                <AppButton
                    title={"Save"}
                    needGradiant={true}
                    titleAllCaps={true}
                    mainContainer={{ marginTop: 15 }}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onSavePress}
                />
            </View>
        </Pressable>
    )
}


const Profile = ({ navigation }) => {

    const { userId } = useSelector(state => state.userSession)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({})
    const [modalName, setModalName] = useState("")
    const [passwordDetails, setPasswordDetails] = useState({})
    const [missingField, setMissingField] = useState("")
    const [showOldPassword, setShowOldPassword] = useState(true)
    const [showPassword, setShowPassword] = useState(true)
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)

    useEffect(() => {
        if (isFocused && userId) getUserDetails(userId)
    }, [isFocused])

    useEffect(() => {
        if (passwordDetails.length > 0 && !passwordDetails.old_password) setMissingField("old_password")
        if (passwordDetails.length > 0 && !passwordDetails.password) setMissingField("password")
        if (passwordDetails.length > 0 && !details.confirm_password) setMissingField("password_confirmation")
        else setMissingField("")
    }, [passwordDetails])



    const logout = () => {
        dispatch(setToastMessage({
            type: "success",
            message: "Logout Successfully"
        }))
        dispatch(logoutUser())
        setTimeout(() => {
            navigation.dispatch(StackActions.replace('AuthStack'))
        }, 1000)
    }

    const getUserDetails = async (id) => {
        setLoading(true)
        try {
            const response = await fetchUsersById(id)
            if (response?.data?.status === "200") {
                setDetails(response?.data?.user)
                dispatch(setUser(response?.data?.user))
            }
        } catch (error) {
            console.log("error", error)

            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message || error?.response?.data?.Error
            }))
        } finally {
            setLoading(false)
        }
    }

    const updateUserDetails = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("username", details?.username)
            formData.append("email", details?.email)
            formData.append("language", details?.language)
            formData.append("location", details?.location)
            formData.append("industry", details?.industry)
            typeof (details?.image) === "object" && formData.append("image", details?.image)
            const response = await updateUserById(formData, userId)
            if (response?.data?.status === "200") {
                setModalName("")
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                getUserDetails(userId)
            }
        } catch (error) {
            console.log("error==>>", error);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message || error?.response?.data?.Error
            }))
        } finally {
            setLoading(false)
        }
    }


    const checkPasswordInput = () => {
        if (!passwordDetails.old_password) setMissingField("old_pasword")
        else if (!passwordDetails.password) setMissingField("password")
        else if (passwordDetails.password && passwordDetails.password?.length < 6) setMissingField("password_length")
        else if (!passwordDetails.confirm_password) setMissingField("password_confirmation")
        else if (passwordDetails.confirm_password && passwordDetails.confirm_password?.length < 6) setMissingField("confirm_password_length")
        else if (passwordDetails?.password !== passwordDetails?.confirm_password) setMissingField("not_matched")
        else changeCurrentPassword()
    }

    const changeCurrentPassword = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("id", userId)
            formData.append("old_password", passwordDetails.old_password)
            formData.append("password", passwordDetails.password)
            formData.append("confirm_password", passwordDetails.confirm_password)
            const response = await changePassword(formData)
            if (response?.data?.status === "200") {
                setModalName("")
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                getUserDetails(userId)
            }
        } catch (error) {
            console.log("error==>>", error);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message || error?.response?.data?.Error
            }))
        } finally {
            setLoading(false)
        }
    }

    const deleteUser = async () => {
        setLoading(true)
        try {
            const response = await deleteUserBydId(userId)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                dispatch(logoutUser())
                setTimeout(() => {
                    navigation.dispatch(StackActions.replace('AuthStack'))
                }, 1000)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message || error?.response?.data?.Error
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerRowContainer}>
                <TouchableOpacity style={styles.triangleButtonContainer}
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={Icons.leftArrowIcon}
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: 'contain',
                            tintColor: newColors.appWhite
                        }}
                    />
                </TouchableOpacity>
                <Text style={styles.headingText}>Settings</Text>
            </View>

            <KeyboardAwareScrollView style={{
                width: '100%',
                flexGrow: 1,
                // paddingTop: 15
            }}>
                <NewUploadImage
                    source={`${IMAGE_URL}/${details?.image}`}
                    onChange={(item) => setDetails({ ...details, "image": item })}
                    mainContainer={{ borderWidth: 0 }}
                />
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 15 }}>
                    <ImageButton
                        source={Icons.orangeInsta}
                        mainContainer={{ width: 38.61, height: 38.61, }}
                        onPress={() => Linking.openURL("https://www.instagram.com/")}
                    />
                    <ImageButton
                        source={Icons.orangeFacebook}
                        mainContainer={{ width: 38.61, height: 38.61, marginHorizontal: 10 }}
                        onPress={() => Linking.openURL("https://www.facebook.com/")}
                    />
                    <ImageButton
                        source={Icons.orangeTwitter}
                        mainContainer={{ width: 38.61, height: 38.61, }}
                        onPress={() => Linking.openURL("https://twitter.com/login")}
                    />
                </View>
                <View style={styles.innerContainer}>
                    <EditInput
                        title={"Username"}
                        onPress={() => setModalName("username")}
                    />
                    <EditInput
                        title={"Password"}
                        onPress={() => setModalName("password")}
                    />
                    <EditInput
                        title={"Email"}
                        onPress={() => setModalName("email")}
                    />
                    <EditInput
                        title={"Private"}
                        needSwitch={true}
                    />
                    <EditInput
                        title={"Verify"}
                    />
                    <EditInput
                        title={"Location"}
                        onPress={() => setModalName("location")}
                    />
                    <EditInput
                        title={"Dark Mode"}
                        needSwitch={true}
                    />
                    <EditInput
                        title={"Delete User"}
                        onPress={() => Alert.alert(
                            'Delete Account',
                            'Are you sure?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        // Handle the OK button press
                                        deleteUser()
                                    },
                                },
                            ],
                            { cancelable: false }
                        )}
                    />
                    <AppButton
                        title={"Logout"}
                        onPress={() => logout()}
                        mainContainer={{ marginTop: 15 }}
                        icon={Icons.logoutIcon}
                    />
                </View>
            </KeyboardAwareScrollView>

            {/* TO CHANGE USERNAME */}
            {modalName === "username" && <EditModal
                onContainerPress={() => setModalName("")}
                onSavePress={() => updateUserDetails()}>
                <AppInput
                    placeholder={"Enter Your Username"}
                    defaultValue={details?.username}
                    onChange={(text) => setDetails({ ...details, "username": text })}
                />
            </EditModal>}

            {/* TO CHANGE PASSWORD */}
            {modalName === "password" && <EditModal
                onContainerPress={() => setModalName("")}
                onSavePress={() => checkPasswordInput()}>
                <AppInput
                    placeholder={"Enter Your Current Password"}
                    defaultValue={passwordDetails?.old_password}
                    secureTextEntry={showOldPassword}
                    placeholderTextColor={missingField === "old_pasword" ? newColors.warningRed : newColors.appInputText}
                    warningMessage={missingField === "old_pasword" ? "Please enter your current password" : ""}
                    iconSource={showOldPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                    onChange={(text) => setPasswordDetails({ ...passwordDetails, "old_password": text })}
                    onIconPress={() => setShowOldPassword(!showOldPassword)}
                />
                <AppInput
                    placeholder={"Enter Your New Password"}
                    mainContainer={{ marginTop: 15 }}
                    placeholderTextColor={missingField === "password" ? newColors.warningRed : missingField === "password_length" ? newColors.warningRed : newColors.appInputText}
                    warningMessage={missingField === "password" ? "Please enter your new password" : missingField === "password_length" ? "Password must be atleast 6 charaters" : ""}
                    secureTextEntry={showPassword}
                    iconSource={showPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                    defaultValue={passwordDetails?.password}
                    onChange={(text) => setPasswordDetails({ ...passwordDetails, "password": text })}
                    onIconPress={() => setShowPassword(!showPassword)}
                />
                <AppInput
                    placeholder={"Confirm Your New Password"}
                    mainContainer={{ marginTop: 15 }}
                    secureTextEntry={showConfirmPassword}
                    placeholderTextColor={missingField === "password_confirmation" ? newColors.warningRed : missingField === "confirm_password_length" ? newColors.warningRed : missingField === "not_matched" ? newColors.warningRed : newColors.appInputText}
                    warningMessage={missingField === "password_confirmation" ? "Please confirm password" : missingField === "confirm_password_length" ? "Password must be atleast 6 charaters" : missingField === "not_matched" ? "Password not matched" : ""}
                    iconSource={showConfirmPassword ? Icons.showPasswordIcon : Icons.hidePasswordIcon}
                    onIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    defaultValue={details?.confirm_password}
                    onChange={(text) => setPasswordDetails({ ...passwordDetails, "confirm_password": text })}
                />
            </EditModal>}


            {/* TO CHANGE EMAIL */}
            {modalName === "email" && <EditModal
                onContainerPress={() => setModalName("")}
                onSavePress={() => updateUserDetails()}>
                <AppInput
                    placeholder={"EMAIL"}
                    defaultValue={details?.email}
                    mainContainer={{ marginVertical: 20 }}
                    onChange={(text) => setDetails({ ...details, "email": text })}
                />
            </EditModal>}

            {/* TO CHANGE LOCATION */}
            {modalName === "location" && <EditModal
                onContainerPress={() => setModalName("")}
                onSavePress={() => updateUserDetails()}>
                <AppInput
                    placeholder={"Location"}
                    defaultValue={details?.location}
                    onChange={(text) => setDetails({ ...details, "location": text })}
                />
            </EditModal>}

            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView >
    )
}

export default Profile;








