import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    Image,
    Keyboard,
    Platform,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ChatScreenHeader from '../../chunks/Chat/ChatScreenHeader';
import AppInput from '../../components/AppInput';
import ChatMessage from '../../chunks/Chat/ChatMessage';
import { KeyboardAvoidingView } from 'react-native';
import Icons from '../../assets/icons';
import colors from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import { fetchGroupChatById, fetchGroupMembers, postGroupChat } from '../../api/methods/auth';
import { subscribeToChannel } from '../../ChatPusher/ChatPusher';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';
import { BASE_URL, IMAGE_URL } from '../../api/config';
import styles from './styles';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';


const Chat = ({ navigation, route }) => {

    const { groupDetails } = route?.params || ""

    const { userDetails } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const listRef = useRef(null)
    const isFocused = useIsFocused()
    const { appTheme, userId } = useSelector(state => state.userSession)

    const [messages, setMessages] = useState()
    const [messageText, setMessageText] = useState("")
    const [loading, setLoading] = useState(false)
    const [senderDetails, setSenderDetails] = useState({})
    const [sendingStatus, setSendingStatus] = useState("")
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    useEffect(() => {
        subscribeToChannel('ChatApp', handleEvent);
    }, [])

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardOpen(true);
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardOpen(false);
            }
        );

        // Clean up listeners when the component unmounts
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        if (isFocused && groupDetails?.id) {
            getAllMessages(groupDetails?.id);
        }
    }, [isFocused, groupDetails]);

    const handleEvent = (event) => {
        let evenData = {}
        if (event?.data) {
            evenData = JSON.parse(event?.data)
            setMessages((prevMessages) => [...prevMessages, evenData])
            listRef?.current?.scrollToEnd({ animated: true });
        }
    }

    const getAllMessages = async (id) => {
        setLoading(true)
        try {
            const response = await fetchGroupChatById(id)
            if (response?.data?.status === "200") {
                setMessages(response?.data?.Data)
                setSenderDetails(response?.data?.Data?.find((item) => item?.sender_id === `${userId}`))
            }
        } catch (error) {
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
                group_id: groupDetails?.id,
                message: messageText,
                sender_image: userDetails?.image,
                sender_name: userDetails?.username,
                group_image: groupDetails?.group_image,
                group_name: groupDetails?.group_name

            };
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            setMessageText("");
            setTimeout(() => {
                Keyboard.dismiss();
            }, 0);

            try {
                setSendingStatus("sending")
                const formData = new FormData();
                formData.append("sender_id", newMessage?.sender_id);
                formData.append("group_id", `${newMessage?.group_id}`);
                formData.append("message", newMessage?.message);
                formData.append("group_image", newMessage?.group_image);
                formData.append("group_name", newMessage?.group_name);
                formData.append("sender_image", newMessage?.sender_image);
                formData.append("sender_name", newMessage?.sender_name);
                const response = await fetch(`${BASE_URL}/post_group_chat`, {
                    method: 'POST',
                    body: formData,
                });
                const responseData = await response.json();
                if (responseData?.status === "200") setSendingStatus("sent")
            } catch (error) {
                console.log("error==>>", error);
            } finally {
                setIsSending("")
            }

        }

    };

    return (
        <SafeAreaView style={styles.mainContainer}>
            <ChatScreenHeader
                title={groupDetails?.group_name || "Chat"}
                onBackPress={() => navigation.goBack()}
                imageSource={`${IMAGE_URL}/${groupDetails?.group_image}`}
                onImagePress={() => navigation.navigate("Members", { groupDetails: groupDetails })}
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
                                <View style={{ flex:1, marginTop: '30%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
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
                    {/* <TouchableOpacity disabled={messageText?.length === 0} style={styles.sendButtonContainer} onPress={() => sendMessage()}>
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
                        mainContainer={{
                            height: 59,
                        }}
                        defaultValue={messageText}
                        onChange={(text) => setMessageText(text)}
                        returnKeyLabel={'send'}
                        returnKeyType={'send'}
                        onSubmitEditing={() => {
                            listRef?.current?.scrollToEnd({ animated: true });
                            sendMessage()
                        }}
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

export default Chat;
