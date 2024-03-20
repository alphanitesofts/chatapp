import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import styles from './styles';
import Icons from '../../assets/icons';
import newColors from '../../utils/newColors';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../assets/images';
import TextArea from '../../components/TextArea';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { addPost } from '../../api/methods/auth';
import { setToastMessage } from '../../redux/actions/actions';

const CreatePost = ({ navigation, route }) => {

    const options = {
        opacity: 0.3,
        mediaType: 'photo',
        videoQuality: 'low',
        quality: 0.1,
    }

    const { otherUserId } = route?.params || ""
    const { userDetails, userId } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({})

    const showCamera = () => {
        launchCamera(options, callback);
        // uri = null
    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
        // uri = null
    }

    const callback = async response => {
        if (response.didCancel) {
            // uri = userInfo?.profile_picture
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            setDetails({ ...details, "image": source })
        }
    }

    const checkData = () => {
        if (!details?.message) Alert.alert("Please add message")
        else publishPost()
    }

    const publishPost = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("user_id", otherUserId ? otherUserId : userId)
            formData.append("poster_id", userId)
            formData.append("message", details?.message)
            details?.image && formData.append("image", details?.image)
            const response = await addPost(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: "Post published successfully"
                }))
                otherUserId ? navigation.navigate("OtherUserDetails", { otherUserId: otherUserId }) : navigation.goBack()
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
            <View style={styles.topRowContainer}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButtonContainer}
                >
                    <Image
                        source={Icons.leftArrowIcon}
                        style={{ width: 25, height: 25, tintColor: newColors.appButtonDarkBg }}
                    />
                </TouchableOpacity>
                <Text style={styles.postHeadingText}>Post</Text>
                <TouchableOpacity style={styles.publishButtonContainer} onPress={() => checkData()}>
                    <Text style={styles.publishText}>Publish</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.postContainer}>
                <View style={styles.userDetailRowContainer}>
                    <ImageComponent
                        source={`${IMAGE_URL}/${userDetails?.image}`}
                        alternate={Images.sampleProfile}
                        mainStyle={{ width: 60, height: 60, resizeMode: 'cover', borderRadius: 100, borderWidth: 3, borderColor: newColors.appButtonDarkBg }}
                    />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={styles.userNameText}>{userDetails?.username || "--"}</Text>
                        <Text style={styles.userEmailText}>{userDetails?.email || "--"}</Text>
                    </View>
                </View>
                <TextArea
                    placeholder={"What do you want to talk about?"}
                    mainStyle={{ minHeight: 50 }}
                    onChange={(text) => setDetails({ ...details, "message": text })}
                />
                {details?.image && <Image
                    source={details?.image}
                    style={{
                        width: '100%',
                        height: 350,
                        borderRadius: 12.84,
                        resizeMode: 'cover'
                    }}
                />}
                <View style={styles.bottomRowContainer}>
                    <TouchableOpacity style={styles.iconButtonContainer} onPress={() => showLibrary()}>
                        <Image
                            source={Icons.imageGallaryIcon}
                            style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: newColors.appInputText }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButtonContainer} onPress={() => showCamera()}>
                        <Image
                            source={Icons.cameraIcon}
                            style={{ width: 20, height: 20, resizeMode: 'contain', tintColor: newColors.appInputText }}
                        />
                    </TouchableOpacity>
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

export default CreatePost;