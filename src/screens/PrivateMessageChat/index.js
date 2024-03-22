import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    Platform,
    SafeAreaView,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ChatScreenHeader from '../../chunks/Chat/ChatScreenHeader';
import AppInput from '../../components/AppInput';
import { KeyboardAvoidingView } from 'react-native';
import Icons from '../../assets/icons';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { fetchPrivateChats } from '../../api/methods/auth';
import { subscribeToChannel } from '../../ChatPusher/ChatPusher';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';
import { BASE_URL, IMAGE_URL } from '../../api/config';
import styles from './styles';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';



const PrivateMessageChat = ({ navigation, route }) => {

    const { chatDetails } = route?.params || ""

    const { userDetails } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const listRef = useRef(null)
    const isFocused = useIsFocused()
    const { appTheme, userId } = useSelector(state => state.userSession)

    const [messages, setMessages] = useState()
    const [messageText, setMessageText] = useState("")
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        subscribeToChannel('ChatApp', handleEvent);
    }, [])

    useEffect(() => {
        if (isFocused) getAllMessages()
    }, [isFocused, chatDetails]);

    const handleEvent = (event) => {
        let evenData = {}
        if (event?.data) {
            evenData = JSON.parse(event?.data)
            setMessages((prevMessages) => [...prevMessages, evenData])
            listRef?.current?.scrollToEnd({ animated: true });
        }
    }

    const getAllMessages = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("sender_id", `${userId}`)
            formData.append("receiver_id", chatDetails?.other_user_id || chatDetails?.requester_id || chatDetails?.id)
            const response = await fetchPrivateChats(formData)
            if (response?.data?.status === "200") setMessages(response?.data?.data)
        } catch (error) {
            console.log("error==>>", error)

            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
            listRef?.current?.scrollToEnd({ animated: true });
        }
    }

    const sendMessage = async () => {
        if (messageText?.length > 0) {
            const newMessage = {
                sender_id: `${userId}`,
                receiver_id: chatDetails?.other_user_id || chatDetails?.requester_id || chatDetails?.id,
                message: messageText,
                sender_image: userDetails?.image,
                sender_name: userDetails?.username,
                receiver_image: chatDetails?.image,
                receiver_name: chatDetails?.username

            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageText("");
            setTimeout(() => {
                Keyboard.dismiss();
            }, 0);

            try {
                const formData = new FormData();
                formData.append("sender_id", newMessage?.sender_id);
                formData.append("receiver_id", `${newMessage?.receiver_id}`);
                formData.append("message", newMessage?.message);
                formData.append("sender_image", newMessage?.sender_image);
                formData.append("sender_name", newMessage?.sender_name);
                formData.append("receiver_image", newMessage?.receiver_image);
                formData.append("sender_name", newMessage?.receiver_name);
                const response = await fetch(`${BASE_URL}/post_private_chat`, {
                    method: 'POST',
                    body: formData,
                });
                const responseData = await response.json();
                if (responseData?.status === "200") listRef?.current?.scrollToEnd({ animated: true });
            } catch (error) {
                console.log("error==>>", error);
            } finally {
                setIsSending("")
                listRef?.current?.scrollToEnd({ animated: true });
            }

        }
    };


    return (
        <SafeAreaView style={styles.mainContainer}>
            <ChatScreenHeader
                title={chatDetails?.username || "Chat"}
                imageSource={`${IMAGE_URL}/${chatDetails?.image || chatDetails?.requester_id_image}`}
                onImagePress={()=>  navigation.navigate("OtherUserDetails", { otherUserId: chatDetails?.requester_id || chatDetails?.id})   }
                onBackPress={() => navigation.goBack()}
                disabledImgButton={false}
                status={"Online"}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >
                <FlatList
                    data={messages}
                    ref={listRef}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.renderContainer}>
                                {item?.sender_id === `${userId}` ? <View style={styles.userContainer}>
                                    <Text style={styles.userMessageText}>{item?.message}</Text>
                                </View>
                                    :
                                    <View style={styles.otherUserContainer}>
                                        <View style={styles.otherUserMessageContainer}>
                                            <Text style={styles.otherUserMessageText}>{item?.message}</Text>
                                        </View>
                                    </View>}
                            </View>
                        )
                    }}
                    ListEmptyComponent={() => {
                        if (loading) return
                        else {
                            return (
                                <View style={{ flex: 1, marginTop: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                    <Image
                                        source={Icons.emptyMessageListIcon}
                                        style={{ width: 80, height: 80, resizeMode: 'contain', tintColor: newColors.appWhite }}

                                    />
                                    <Text style={{
                                        color: newColors.appWhite,
                                        fontSize: 20,
                                        fontWeight: 'bold',
                                        fontFamily: fonts.PoppinsBold,
                                        marginTop: 15
                                    }}>No Converstation Yet</Text>
                                </View>
                            )
                        }
                    }}
                />


                <View style={styles.inputRowContainer}>
                    {/* <TouchableOpacity disabled={messageText?.length === 0} style={styles.sendButtonContainer} onPress={() => ""}>
                        <Image
                            source={Icons.micIcon}
                            style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                tintColor: colors.appWhite
                            }}
                        />
                    </TouchableOpacity> */}
                    <AppInput
                        mainContainer={{ height: 59 }}
                        defaultValue={messageText}
                        onChange={(text) => setMessageText(text)}
                        returnKeyLabel={'send'}
                        returnKeyType={'send'}
                        onSubmitEditing={() => {
                            listRef?.current?.scrollToEnd({ animated: true });
                            sendMessage()
                        }}
                        placeholder={"Write now..."}
                        iconSource={Icons.sendMessageIcon}
                        iconSourceTintColor={{ tintColor: newColors.appButtonDarkBg }}
                        onIconPress={() => sendMessage()}
                    />
                </View>
            </KeyboardAvoidingView>
            <ToastMessage />
            <Loader
                loading={loading}
                isShowIndicator={true}
            />

        </SafeAreaView>
    )
}

export default PrivateMessageChat;
