import React, { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Dimensions,
    FlatList,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Selector from '../../chunks/PublicChat/Selector';
import GroupCard from '../../chunks/PublicChat/GroupCard';
import NetworkCard from '../../chunks/PublicChat/NetworkCard';
import AppHeader from '../../components/AppHeader';
import AcceptRequestModal from '../../chunks/PublicChat/AcceptRequestModal';
import SwipeModal from '../../chunks/PublicChat/SwipeModal';
import CreateGroupModal from '../../chunks/PublicChat/CreateGroupModal';
import StatusModal from '../../chunks/PublicChat/StatusModal';
import { useIsFocused } from '@react-navigation/native';
import ContactSelectionModal from '../../chunks/PublicChat/ContactSelectionModal';
import WaitListModal from '../../chunks/PublicChat/WaitListModal';
import Loader from '../../components/Loader';
import { fetchGroupsUserNotMemeber, fetchInvitationsById, fetchPrivateGroups, fetchPublicJoinedGroups, processInvitation } from '../../api/methods/auth';
import Carousel from 'react-native-snap-carousel';
import ToastMessage from '../../components/ToastMessage';
import styles from './styles';
import newColors from '../../utils/newColors';
import { setToastMessage } from '../../redux/actions/actions';
import { BASE_URL, IMAGE_URL } from '../../api/config';
import Icons from '../../assets/icons';
import fonts from '../../../assets';


const Search = ({ navigation }) => {

    const { appTheme, userId } = useSelector(state => state.userSession)

    const dispatch = useDispatch()
    const isFocused = useIsFocused()
    const carouselRef = useRef(null)


    const [selectedTab, setSelectedTab] = useState("1")
    const [modalName, setModalName] = useState("")
    const [loading, setLoading] = useState(false)
    const [joinedGroups, setJoinedGroups] = useState([])
    const [unJoinedGroups, setUnjoinedGroups] = useState([])
    const [joined, setJoined] = useState(true)
    const [privateGroups, setPrivateGroups] = useState([])
    const [activeSwipTab, setActiveSwipeTab] = useState(0)
    const [invites, setInvites] = useState([])
    const [tabs, setTabs] = useState([])
    const [availableGroups, setAvailableGroups] = useState([])

    useEffect(() => {
        if (isFocused) {
            setModalName("")
            if (selectedTab === "1") getJoinedGroups(userId)
            else getPrivateGroups(userId)
        }
        setActiveSwipeTab(0)
    }, [isFocused, joined, selectedTab])

    useEffect(() => {
        if (selectedTab === "1") setTabs(["0", "1"])
        else setTabs(["0"])
    }, [selectedTab])

    const getJoinedGroups = async (id) => {
        setLoading(true)
        try {
            const response = await fetchPublicJoinedGroups(id)
            if (response?.data?.status === "200") setJoinedGroups(response?.data?.data)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
            getPublicGroupsUserNotMember()
        }
    }

    const getPublicGroupsUserNotMember = async () => {
        setLoading(true)
        try {
            const response = await fetchGroupsUserNotMemeber(userId)
            if (response?.data?.status === "200") setAvailableGroups(response?.data?.data)
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
            fetchInvitations(id)
        }
    }


    const fetchInvitations = async (id) => {
        try {
            const response = await fetchInvitationsById(id)
            if (response?.data?.status === "200") setInvites(response?.data?.Invitations)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const acceptDeclineInvite = async (id, request) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("invitation_id", id)
            formData.append("request", request)
            const response = await processInvitation(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                fetchInvitations(userId)
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

    const collabWithGroup = async (groupId) => {
        const body = {
            members: [userId]
        }
        console.log("body==>>", body);
        await fetch(`${BASE_URL}/addMembers/${groupId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then((res) => res.json())
            .then(result => {
                dispatch(setToastMessage({
                    type: "success",
                    message: result?.message
                }))
            })
            .catch(error => dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))).finally(() => {
                setLoading(false)
                getJoinedGroups(userId)
            })
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <AppHeader
                    title={"Search"}
                    titleAllCaps={true}
                    navigation={navigation}
                    onRightIconPress={() => setModalName("create")}
                    mainContainer={{
                        marginBottom: 15
                    }}
                />
                <Selector
                    items={[
                        { id: "1", label: "Public", },
                        { id: "2", label: "Private" },
                    ]}
                    keyToRender={"label"}
                    appTheme={appTheme}
                    defaultValue={selectedTab}
                    onChange={(item) => setSelectedTab(item?.id)}
                    mainStyle={{ marginBottom: 5 }}
                />
                {/* {selectedTab === "1" &&
                        <AppSwitch
                            title={joined ? "Joined" : "Unjoined"}
                            titleAllCaps={true}
                            defaultValue={joined}
                            onChange={(value) => setJoined(value)}
                            mainContainer={{
                                marginLeft: 'auto',
                            }}
                        />
                    } */}
                <View style={{
                    width: '100%',
                    height: 220,
                    marginTop: 15,
                }}>
                    <GroupCard
                        appTheme={appTheme}
                        items={selectedTab === "2" ? privateGroups : joinedGroups}
                        mainContainer={{ borderWidth: selectedTab === "2" ? 0 : 3 }}
                        onPress={(item) => {
                            navigation.navigate("Chat", { groupDetails: item })
                        }}
                        emptyListMessage={joined ? "No Joined Groups Available" : "No Groups Available"}
                    />
                </View>
                <View style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '10%',
                    height: 280,
                }}>
                    <Carousel
                        ref={carouselRef}
                        data={tabs}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    width: '100%',
                                }}>
                                    <Text style={styles.groupsHeading}>{index === 0 ? "Socialize" : "Available to Network"}</Text>

                                    {index === 0 ?
                                        <View style={{ width: '100%', height: '100%', paddingBottom: 100, alignItems: 'center', justifyContent: 'center' }}>
                                            <FlatList
                                                data={invites}
                                                keyExtractor={(item, index) => index}
                                                contentContainerStyle={{
                                                    width: '100%',
                                                    alignItems: 'center',
                                                }}
                                                numColumns={2}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <NetworkCard
                                                            mainContainer={{ marginBottom: 10 }}

                                                            source={`${IMAGE_URL}/${item?.sender_image}`}
                                                            firstKeyToRender={item?.group_name}
                                                            secondKeyToRender={item?.sender_name}
                                                            firstButtonTitle={"Accept"}
                                                            onFirstButtonPress={() => acceptDeclineInvite(item?.id, "accept")}
                                                            secondButtonTitle={"Decline"}
                                                            onSecondButtonPress={() => acceptDeclineInvite(item?.id, "decline")}
                                                        />
                                                    )
                                                }}
                                                ListEmptyComponent={() => {
                                                    if (loading) return
                                                    else
                                                        return (
                                                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                                                <Image
                                                                    source={Icons.requestNotFoundIcon}
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        resizeMode: 'contain',
                                                                        tintColor: newColors.appWhite
                                                                    }}
                                                                />
                                                                <Text style={{
                                                                    color: newColors.appWhite,
                                                                    marginVertical: 15,
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                    fontFamily: fonts.PoppinsBold
                                                                }}>No Invitations Found</Text>
                                                            </View>
                                                        )
                                                }}
                                            />
                                        </View>
                                        :

                                        <View style={{ width: '100%', height: '100%', paddingBottom: 100, alignItems: 'center', justifyContent: 'center' }}>
                                            <FlatList
                                                data={availableGroups}
                                                keyExtractor={(item, index) => index}
                                                contentContainerStyle={{
                                                    width: '100%',
                                                    alignItems: 'center',
                                                }}
                                                numColumns={2}
                                                renderItem={({ item }) => {
                                                    return (
                                                        <NetworkCard
                                                            source={`${IMAGE_URL}/${item?.group_image}`}
                                                            firstKeyToRender={item?.group_name}
                                                            secondKeyToRender={item?.group_type?.charAt(0).toUpperCase().concat(item?.group_type.slice(1))}
                                                            mainContainer={{ marginBottom: 10 }}
                                                            firstButtonTitle={"Collab"}
                                                            onFirstButtonPress={() => collabWithGroup(item?.id)}
                                                        />
                                                    )
                                                }}
                                                ListEmptyComponent={() => {
                                                    if (loading) return
                                                    else
                                                        return (
                                                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                                                <Image
                                                                    source={Icons.peopleIcon}
                                                                    style={{
                                                                        width: 40,
                                                                        height: 40,
                                                                        resizeMode: 'contain',
                                                                        tintColor: newColors.appWhite
                                                                    }}
                                                                />
                                                                <Text style={{
                                                                    color: newColors.appWhite,
                                                                    marginVertical: 15,
                                                                    fontSize: 18,
                                                                    fontWeight: 'bold',
                                                                    fontFamily: fonts.PoppinsBold
                                                                }}>No Available Groups</Text>
                                                            </View>
                                                        )
                                                }}
                                            />
                                        </View>

                                    }

                                </View>
                            )
                        }}
                        sliderWidth={Dimensions.get("window").width}
                        itemWidth={Dimensions.get("window").width}
                        onSnapToItem={(index) => setActiveSwipeTab(index)}
                    />
                </View>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 'auto',
                    marginBottom: 15
                }}>
                    {
                        tabs && tabs?.map((item, index) => {
                            return (
                                <View style={{
                                    width: 14,
                                    height: 14,
                                    borderRadius: 100,
                                    backgroundColor: activeSwipTab !== index ? newColors.switchBg : newColors.appButtonDarkBg,
                                    marginRight: 10
                                }}>
                                </View>
                            )
                        })
                    }
                </View>
            </View>
            {modalName === "create" && <CreateGroupModal
                appTheme={appTheme}
                onCreatePress={() => {
                    setModalName("")
                    selectedTab === "1" ? getJoinedGroups(userId) : getPrivateGroups(userId)
                }}
                onCrossPress={() => setModalName("")}
            />}
            {modalName === "contact" && <ContactSelectionModal
                appTheme={appTheme}
                onNextPress={() => setModalName("status")}
            />}
            {modalName === "status" && <StatusModal
                onCrossPress={() => setModalName("")}
                onPostPress={() => {
                    setModalName("")
                    navigation.navigate("Members")
                }}
            />}
            {modalName === "request" &&
                <AcceptRequestModal
                    appTheme={appTheme}
                    onCrossPress={() => setModalName("")}
                />}
            {modalName === "swipe" && <SwipeModal
                onClosePress={() => setModalName("")}
            />}
            {modalName === "waitList" && <WaitListModal
                appTheme={appTheme}
                onCrossPress={() => setModalName("")}
                onDeclinePress={() => {
                    Alert.alert("Declined")
                    setModalName("")
                }}
                onAcceptPress={() => {
                    Alert.alert("Accepted")
                    setModalName("")
                }}
            />}

            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </SafeAreaView>
    )
}

export default Search;