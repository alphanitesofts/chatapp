import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Image,
    FlatList,
    Keyboard
} from 'react-native'
import styles from './styles';
import BackButton from '../../components/BackButton';
import ImageComponent from '../../components/ImageComponent';
import Images from '../../assets/images';
import newColors from '../../utils/newColors';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMessage } from '../../redux/actions/actions';
import { addComment, fetchCommentsByPId, fetchPostsById, fetchUsersById, likePostApi } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import { IMAGE_URL } from '../../api/config';
import CardView from '../../chunks/People/CardView';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppInput from '../../components/AppInput';
import Icons from '../../assets/icons';
import fonts from '../../../assets';

const OtherUserDetails = ({ navigation, route }) => {

    const { userId } = useSelector(state => state.userSession)

    const rbRef = useRef()
    const commentListRef = useRef()

    const { otherUserId } = route?.params || ""

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState()
    const [loading, setLoading] = useState(false)
    const [postList, setPostList] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [comments, setComments] = useState([])
    const [selectedPostId, setSelectedPostId] = useState()
    const [addingComment, setAddingComment] = useState(false)
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        if (isFocused && otherUserId) getUserDetails(otherUserId)
    }, [isFocused])

    const getUserDetails = async (id) => {
        setLoading(true)
        try {
            const response = await fetchUsersById(id)
            if (response?.data?.status === "200") {
                setUserInfo(response?.data?.user)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            getAllPosts()
        }
    }

    const getAllPosts = async () => {
        try {
            const response = await fetchPostsById(otherUserId, userId)
            if (response?.data?.status === "200") setPostList(response?.data?.Data)
        } catch (error) {
            console.log("error", error);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const LikePost = async (postId) => {
        try {
            const formData = new FormData()
            formData.append("user_id", userId)
            formData.append("post_id", postId)
            const response = await likePostApi(formData)
            if (response?.data?.status === '200') {
                const updatedPostList = await fetchPostsById(otherUserId, userId)
                if (response?.data?.status === '200') setPostList(updatedPostList?.data?.Data)
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

    const getPostComments = async (id) => {
        setLoadingComments(true)
        try {
            const response = await fetchCommentsByPId(id)
            if (response?.data?.status === "200") setComments(response?.data)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))

        } finally {
            setLoadingComments(false)
        }
    }

    const postComment = async () => {
        setAddingComment(true)
        try {
            const formData = new FormData()
            formData.append("user_id", userId)
            formData.append("post_id", selectedPostId)
            formData.append("comment", commentText)
            const response = await addComment(formData)
            if (response?.data?.status === "200") {
                const updatedComments = await fetchCommentsByPId(selectedPostId)
                if (response?.data?.status === "200") setComments(updatedComments?.data)
            }
        } catch (error) {
            console.log("error=>>", error);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setCommentText("")
            setAddingComment(false)
            commentListRef?.current.scrollToEnd({ animated: true })
        }
    }

    const commentRenderItem = ({ item }) => {
        return (
            <View style={styles.commentRenderContainer}>
                <ImageComponent
                    source={`${IMAGE_URL}/${item?.image}`}
                    alternate={Images.sampleProfile}
                    mainStyle={{ width: 40, height: 40, borderRadius: 100, resizeMode: 'cover' }}
                />
                <View style={styles.commentDetailContainer}>
                    <Text style={styles.commentNameText}>{`${item?.username}` || "--"} <Text style={styles.commentDateText}>{`- ${item?.Idate}` || "--"}</Text></Text>
                    <Text style={styles.commentText}>{item?.comment}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.topRowContainer}>
                    <BackButton
                        mainContainer={styles.backButtonContainer}
                        onPress={() => navigation.goBack()} />
                    <Text style={styles.topHeadingText}>{userInfo?.username || "--"}</Text>
                    <TouchableOpacity style={styles.postButtonContainer} onPress={() => navigation.navigate("CreatePost", { otherUserId: otherUserId })}>
                        <Text style={styles.postText}>Add Post</Text>
                    </TouchableOpacity>
                </View>


                <ScrollView style={{ width: '100%', height: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
                    <ImageComponent
                        source={userInfo?.image ? `${IMAGE_URL}/${userInfo?.image}` : Images.placeholder}
                        mainStyle={styles.imageContainer}
                        alternate={Images.placeholder}
                    />
                    <Text style={styles.emailText}>{userInfo?.email}</Text>



                    <View style={styles.bottomContiner}>
                        {!loading && postList && postList?.length <= 0 ? <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', height: 350 }}>
                            <Image
                                source={Icons.cameraIcon}
                                style={{ width: 80, height: 80, resizeMode: 'contain', tintColor: newColors.appWhite }}

                            />
                            <Text style={{
                                color: newColors.appWhite,
                                fontSize: 20,
                                fontWeight: 'bold',
                                fontFamily: fonts.PoppinsBold,
                                marginTop: 15
                            }}>No Posts Yet</Text>
                        </View>
                            :
                            <>
                                {
                                    postList.map((item, index) => {
                                        return (
                                            <CardView
                                                key={index}
                                                item={item}
                                                onCommentPress={() => {
                                                    setSelectedPostId(item?.id)
                                                    getPostComments(item?.id)
                                                    rbRef.current.open()
                                                }}
                                                onLikePress={() => {
                                                    setPostList(postList?.map((e) => ({
                                                        ...e,
                                                        is_liked: e.id === item.id && !e.is_liked,
                                                    })))
                                                    LikePost(item?.id)
                                                }}
                                            />
                                        )
                                    })
                                }
                            </>}
                    </View>
                </ScrollView>
            </View>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
            <RBSheet
                ref={rbRef}
                animationType='slide'
                closeOnDragDown={false}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(10, 10, 10, 0.7)'
                    },
                    container: {
                        backgroundColor: newColors.popupBg,
                        height: '70%',
                        padding: 15,
                        borderTopRightRadius: 12.84,
                        borderTopLeftRadius: 12.84
                    },
                    draggableIcon: {
                        backgroundColor: newColors.appButtonDarkBg
                    }
                }}
            >
                <View style={{ flex: 1 }}>
                    <TouchableOpacity style={{
                        width: 30,
                        height: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 'auto'
                    }} onPress={() => {
                        getAllPosts()
                        rbRef.current.close()
                    }}>
                        <Image
                            source={Icons.crossIcon}
                            style={{ width: 15, height: 15, resizeMode: 'contain', tintColor: newColors.appButtonDarkBg, alignSelf: 'center' }}
                        />
                    </TouchableOpacity>
                    <Text style={styles.commentsHeading}>Comments</Text>
                    <ScrollView style={{ width: '100%' }}>
                        <TouchableOpacity activeOpacity={1}>
                            <FlatList
                                ref={commentListRef}
                                data={comments?.Data}
                                keyExtractor={(item, index) => index}
                                renderItem={commentRenderItem}
                                ListEmptyComponent={() => {
                                    if (loadingComments) return
                                    else return (
                                        <View style={{
                                            width: '100%',
                                            height: 200,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            marginTop: 60
                                        }}>
                                            <Image
                                                source={Images.emptyCommentList}
                                                style={{ width: 80, height: 80, resizeMode: 'contain' }}
                                            />
                                            <Text style={{
                                                color: newColors.appWhite,
                                                fontSize: 20,
                                                fontWeight: 'bold',
                                                fontFamily: fonts.PoppinsBold,
                                                marginTop: 15
                                            }}>No comments yet</Text>
                                        </View>
                                    )
                                }}
                            />
                        </TouchableOpacity>
                    </ScrollView>
                    <AppInput
                        placeholder={"Type a comment..."}
                        mainContainer={{
                            height: 50,
                            marginBottom: 45
                        }}
                        iconSource={Icons.leftArrowIcon}
                        iconSourceTintColor={{
                            transform: [{ rotate: '180deg' }]
                        }}
                        returnKeyType={"done"}
                        defaultValue={commentText}
                        isLoading={addingComment}
                        onChange={(text) => setCommentText(text)}
                        onSubmitEditing={() => {
                            if (commentText && commentText?.length > 0) {
                                Keyboard.dismiss();
                                postComment()
                            }
                        }}
                        onIconPress={() => {
                            if (commentText && commentText?.length > 0) {
                                Keyboard.dismiss();
                                postComment()
                            }
                        }}
                    />
                    <Loader
                        loading={loadingComments}
                        isShowIndicator={true}
                    />
                </View>
            </RBSheet>
        </SafeAreaView>
    )
}

export default OtherUserDetails;