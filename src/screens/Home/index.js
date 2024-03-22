import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import ImageButton from '../../chunks/People/ImageButton';
import Icons from '../../assets/icons';
import colors from '../../utils/colors';
import AppSwitch from '../../components/AppSwitch';
import CardView from '../../chunks/People/CardView';
import { useDispatch, useSelector } from 'react-redux';
import ProfileCardModal from '../../chunks/Home/ProfileCardModal';
import Images from '../../assets/images';
import newColors from '../../utils/newColors';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { setToastMessage } from '../../redux/actions/actions';
import { addComment, fetchCommentsByPId, fetchPostsById, fetchRandomUsers, likePostApi } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppInput from '../../components/AppInput';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import fonts from '../../../assets';
import ProfileInfoModal from '../../chunks/Home/ProfileInfoModal';
import RequestModal from '../../chunks/Contacts/RequestModal';

const Home = ({ navigation }) => {

    const rbRef = useRef()
    const commentListRef = useRef()

    const { userId, userDetails } = useSelector(state => state.userSession)
    const dispatch = useDispatch()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [modalName, setModalName] = useState("")
    const [userList, setUserList] = useState([])
    const [postList, setPostList] = useState([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [comments, setComments] = useState([])
    const [selectedPostId, setSelectedPostId] = useState()
    const [addingComment, setAddingComment] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [selectedUser, setSelectedUser] = useState()

    useEffect(() => {
        if (isFocused && userId) getAllPosts()
    }, [isFocused])

    const getAllPosts = async () => {
        setLoading(true)
        try {
            const response = await fetchPostsById(userId, userId)
            if (response?.data?.status === "200") setPostList(response?.data?.Data)
        } catch (error) {
            console.log("error in post api", error);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            getRandomUsers()
        }
    }

    const getRandomUsers = async () => {
        try {
            const response = await fetchRandomUsers()
            if (response?.data?.status === "200" || response?.data?.status === "success") setUserList(response?.data?.data?.filter((item) => item?.id !== userId))
        } catch (error) {
            console.log("error==>>", error);
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
                const updatedPostList = await fetchPostsById(userId, userId)
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
            <TouchableOpacity style={styles.postIconContainer} onPress={() => navigation.navigate("CreatePost")}>
                <Image
                    source={Icons.PlusCircle}
                    style={{
                        width: 25,
                        height: 25,
                        resizeMode: 'contain'
                    }}
                />
            </TouchableOpacity>
            {/* <ScrollView style={{ width: '100%', }}> */}
            <View style={styles.innerContainer}>
                <View style={{ width: '100%', height: '30%', alignItems: 'center' }}>
                    <FlatList
                        data={userList}
                        numColumns={5}
                        renderItem={({ item,index }) => {
                            return (
                                <ImageButton
                                    item={item}
                                    onPress={() => {
                                        setSelectedUser(item)
                                        setModalName("view_profile")
                                    }}
                                />
                            )
                        }}
                        contentContainerStyle={{
                            width: '100%',
                            padding: 15,
                        }}
                    />
                </View>
                <View style={{ width: '100%', padding: 15, bottom: 15, zIndex: 10 }}>
                    <View style={styles.infoCard}>
                        <ImageComponent
                            source={`${IMAGE_URL}/${userDetails?.image}`}
                            mainStyle={{
                                width: 54,
                                height: 54,
                                resizeMode: "cover",
                                borderRadius: 100,
                                marginBottom: 20
                            }}
                        />
                        <View style={styles.detailContainer}>
                            <Text style={styles.nameText}>{userDetails?.username || "--"}</Text>
                            <Text style={styles.subheadingText}>{userDetails?.location || "--"}</Text>
                            <Text style={styles.dateText}>{userDetails?.Idate || "--"}</Text>
                        </View>
                        <View style={styles.tickRoundContainer}>
                            <Image
                                source={Icons.checkIcon}
                                style={{
                                    width: 10,
                                    height: 10,
                                    resizeMode: "cover",
                                    tintColor: newColors.appBlack,
                                    borderRadius: 100
                                }}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.bottomContiner}>
                    <View style={styles.switchContainer}>
                        <AppSwitch
                            icon={Icons.messageIcon}
                            tintColor={colors.appBlue}
                        />
                        <View style={styles.windRoundContainer}>
                            <Image
                                source={Icons.burgerMenu}
                                style={{ width: 20, height: 20, resizeMode: 'contain' }}
                            />
                        </View>
                        <AppSwitch
                            icon={Icons.likeIcon}
                        />
                    </View>

                    <ScrollView style={{ width: '100%' }} contentContainerStyle={{ flexGrow: 1, paddingBottom: 70 }}>
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
                                                // onPress={() => setModalName("profile")}
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
                    </ScrollView>
                </View>
            </View>
            {/* </ScrollView> */}
            {modalName === "profile" && <ProfileCardModal
                onCrossPress={() => setModalName("")}
            />}
            {modalName === "view_profile" && 
            // <ProfileInfoModal
            //     details={selectedUser}
            //     data={userList}
            //     navigation={navigation}
            //     onClosePress={() => setModalName("")}
            // />

            <RequestModal
                
    navigation={navigation}
    details={selectedUser}
    onClosePress={() => setModalName("")}
    onSuccess={(message) => {
        setModalName("")
        // dispatch(setToastMessage({
        //     type: "success",
        //     message: message
        // }))
    }}
    onError={(message) => {
        setModalName("")
        // dispatch(setToastMessage({
        //     type: "error",
        //     message: message
        // }))
        // getContacts(userId)
    }}
    identifier={"Members"}
    
    />
            
            }
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
                        <TouchableOpacity activeOpacity={1} ref={commentListRef}>
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

export default Home;