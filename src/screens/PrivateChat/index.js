import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    Text,
    View,
    Image
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import ChatListCard from '../../chunks/PrivateChat/ChatListCard';
import PrivateGroupChatCard from '../../chunks/PrivateChat/PrivateGroupChatCard';
import MembersModal from '../../chunks/PrivateChat/MembersModal';
import ConfirmModal from '../../chunks/PrivateChat/ConfirmModal';
import NewChatModal from '../../chunks/PrivateChat/NewChatModal';
import SearchChatModal from '../../chunks/PrivateChat/SearchChatModal';
import Icons from '../../assets/icons';
import ToastMessage from '../../components/ToastMessage';
import Loader from '../../components/Loader';
import { setToastMessage } from '../../redux/actions/actions';
import { deleteMember, fetchPrivateGroups, fetchUserContacts } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import fonts from '../../../assets';
import newColors from '../../utils/newColors';


const PrivateChat = ({ navigation }) => {

    const { userId } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const [modalName, setModalName] = useState("")
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([])
    const [privateGroups, setPrivateGroups] = useState([])
    const [selectedGroupId, setSelectedGroupId] = useState("")

    useEffect(() => {
        if (isFocused && userId) getUserContacs(userId)
    }, [isFocused, userId])

    const getUserContacs = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("user_id", id)
            const response = await fetchUserContacts(formData)
            if (response?.data?.status === "200") {

                setChats(response?.data?.contact_data)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
            getPrivateGroups(userId)
        }
    }

    const getPrivateGroups = async (id) => {
        setLoading(true)
        try {
            const response = await fetchPrivateGroups(id)
            if (response?.data?.status === "200") setPrivateGroups(response?.data?.data)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const leaveGroup = async () => {
        setLoading(true)
        try {
            let body = {
                members: [`${userId}`]
            }
            const response = await deleteMember(body, selectedGroupId)
            if (response?.data?.status === "200") {
                setModalName("")
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                getPrivateGroups(userId)
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


    const renderItem = ({ item, index }) => {
        return (
            <ChatListCard
                item={item}
                key={index}
                onPress={(item) => navigation.navigate("PrivateMessageChat", { chatDetails: item })}
            />
        )
    }

    const groupRenderItem = ({ item, index }) => {
        return (
            <PrivateGroupChatCard
                key={index}
                item={item}
                onItemPress={() => navigation.navigate("Chat", { groupDetails: item })}
                onMembersPress={() => {
                    setSelectedGroupId(item.id)
                    setModalName("members")
                }}
                onLeavePress={() => {
                    setSelectedGroupId(item.id)
                    setModalName("confirm")
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>

            <View style={styles.headerStyle}>
                <Text style={styles.titleText}>Chat</Text>
                {/* <TouchableOpacity style={styles.plusContainer} onPress={() => setModalName("new_chat")}>
                    <Image
                        source={Icons.PlusCircle}
                        style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                    />
                </TouchableOpacity> */}
            </View>
            <View style={styles.innerContainer}>
                <View style={{
                    width: '100%',
                    height: 320,
                    marginBottom: 15
                }}>
                    <FlatList
                        data={chats}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem}
                        ListEmptyComponent={() => {
                            if (loading) return
                            else {
                                return (
                                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
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
                                        }}>No Chats Found</Text>
                                    </View>
                                )
                            }
                        }}
                    />
                </View>
                <FlatList
                    renderItem={groupRenderItem}
                    data={privateGroups}
                    keyExtractor={(item, index) => index}
                    numColumns={2}
                    contentContainerStyle={{
                        width: '100%',
                        alignItems: 'center'
                    }}
                />
            </View>
            {modalName === "new_chat" && <NewChatModal
                onCrossPress={() => setModalName("")}
                onNexPress={() => setModalName("search_chat")}
            />}
            {modalName === "search_chat" && <SearchChatModal
                onCrossPress={() => setModalName("")}
                onNextPress={() => {
                    setModalName("")
                    navigation.navigate("Chat")
                }}
            />}
            {modalName === "members" && <MembersModal
                groupId={selectedGroupId}
                onClosePress={() => {
                    setSelectedGroupId("")
                    setModalName("")
                }}
            />}
            {modalName === "confirm" && <ConfirmModal
                onConfirmPress={() => leaveGroup()}
                onCrossPress={() => setModalName("")}
            />}
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView>
    )
}

export default PrivateChat;