import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    View
} from 'react-native';
import Header from '../../chunks/Members/Header';
import Images from '../../assets/images';
import { fetchGroupMembers, postInvitation } from '../../api/methods/auth';
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import ImageComponent from '../../components/ImageComponent';
import { BASE_URL, IMAGE_URL } from '../../api/config';
import styles from './styles';
import newColors from '../../utils/newColors';
import AddMemberModal from '../../chunks/Members/AddMemeberModal';
import { useDispatch, useSelector } from 'react-redux';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';


const RoundView = ({ children, mainContainer }) => {
    return (
        <View style={[{
            width: '100%',
            borderRadius: 10,
            backgroundColor: newColors.popupBg,

        }, mainContainer]}>
            {children}
        </View>
    )
}


const Members = ({ navigation, route }) => {

    const { userId } = useSelector(state => state.userSession)
    const { groupDetails } = route?.params || ""

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState()
    const [modalName, setModalName] = useState("")
    const [inviteListIds, setInvitListIds] = useState()

    useEffect(() => {
        if (isFocused) groupDetails?.id && getGroupMemberDetails(groupDetails?.id)
    }, [isFocused, groupDetails?.id])

    const getGroupMemberDetails = async (id) => {
        setLoading(false)
        try {
            const response = await fetchGroupMembers(id)
            if (response?.data?.status === "200") setDetails(response?.data?.data?.users)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const addPublicMemebers = async () => {
        const body = {
            members: inviteListIds
        }
        await fetch(`${BASE_URL}/addMembers/${groupDetails?.id}`, {
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
                setModalName("")
            })
            .catch(error => dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))).finally(() => {
                setLoading(false)
                getGroupMemberDetails(groupDetails?.id)
            })
    }

    const addPrivateMembers = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("sender_id", userId)
            formData.append("receiver_ids", inviteListIds)
            formData.append("group_id", groupDetails?.id)
            const response = await postInvitation(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setModalName("")
            }
        } catch (error) {
            console.log("error==>", error)
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
            getGroupMemberDetails(groupDetails?.id)
        }
    }

    const renderItem = ({ item, index }) => {

        return (
            <View style={[styles.renderContainer, {
                borderBottomWidth: item === details[details?.length - 1] ? 0 : 0.5,
            }]}>

                <View style={styles.renderFirstRowContainer}>
                    <ImageComponent
                        source={`${IMAGE_URL}/${item?.image}`}
                        alternate={Images.placeholder}
                        mainStyle={{
                            width: 40,
                            height: 40,
                            resizeMode: 'cover',
                            borderRadius: 100
                        }}
                    />
                    <Text style={styles.renderText} numberOfLines={3} ellipsizeMode='tail'>{item?.username}</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Header
                title={groupDetails?.group_name || "--"}
                navigation={navigation}
                onAddPress={() => setModalName("add")}
            />
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.infoContainer}>
                    <ImageComponent
                        source={`${IMAGE_URL}/${groupDetails?.group_image}`}
                        mainStyle={styles.groupImageContainer}
                    />
                    <Text style={styles.groupNameText}>{groupDetails?.group_name && groupDetails?.group_name?.toUpperCase() || "--"}</Text>
                    <Text style={styles.groupCountText}>{`Group . ${details?.length} ${details?.length > 1 ? "Memebers" : "Member"}`}</Text>
                </View>
                <View style={{ width: '100%', padding: 20 }}>
                    <Text style={styles.membersListCountText}>{`${details?.length} ${details?.length > 1 ? "Memebers" : "Member"}`}</Text>
                    <RoundView>
                        <FlatList
                            data={details}
                            renderItem={renderItem}
                        />
                    </RoundView>

                </View>
            </ScrollView>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
            {modalName === "add" && <AddMemberModal
                joinedMembers={details}
                onCrossPress={() => setModalName("")}
                onChange={(list) => {
                    if (list) {
                        if (groupDetails?.group_type === "public") setInvitListIds(list)
                        else setInvitListIds(list?.join(","))
                    }
                }}
                onConfirmPress={() => {
                    if (groupDetails?.group_type === "public") addPublicMemebers()
                    else addPrivateMembers()
                }}
            />}
        </SafeAreaView>
    )
}

export default Members;