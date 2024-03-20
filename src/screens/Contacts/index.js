import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Text
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import ContactCard from '../../chunks/Contacts/ContactCard';
import RequestModal from '../../chunks/Contacts/RequestModal';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { fetchContactRequestsById } from '../../api/methods/auth';
import { setToastMessage } from '../../redux/actions/actions';
import { useIsFocused } from '@react-navigation/native';
import Icons from '../../assets/icons';
import newColors from '../../utils/newColors';
import AddContactModal from '../../chunks/Contacts/AddContactModal';

const Contacts = ({ navigation }) => {

    const { appTheme, userId } = useSelector(state => state.userSession)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [modalName, setModalName] = useState("")
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [selectedRequest, setSelectedRequest] = useState()

    useEffect(() => {
        if (isFocused && userId) {
            getContacts(userId)
        }
    }, [isFocused, userId])

    const getContacts = async (id) => {
        setLoading(true)
        try {
            const response = await fetchContactRequestsById(id)
            if (response?.data?.status === "200") setList(response?.data?.Data)
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
            <ContactCard
                item={item}
                onPress={(selectedItem) => {
                    setSelectedRequest(selectedItem)
                    setModalName("request")
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerStyle}>
                <Text style={styles.titleText}>Contacts</Text>
                <TouchableOpacity style={styles.plusContainer} onPress={() => setModalName("add")}>
                    <Image
                        source={Icons.PlusCircle}
                        style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                    />
                </TouchableOpacity>
            </View>
            <FlatList
                renderItem={renderItem}
                data={list}
                keyExtractor={(item, index) => index}
                ListEmptyComponent={() => {
                    if (loading) return null
                    else {
                        return (
                            <View style={styles.emptContainer}>
                                <Image
                                    source={Icons.requestNotFoundIcon}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        resizeMode: "contain",
                                        tintColor: newColors.appWhite
                                    }}
                                />
                                <Text style={styles.emptyText}>{"Requests not found"}</Text>
                            </View>
                        )
                    }
                }}
            />
            {modalName === "add" && <AddContactModal
                onClosePress={() => setModalName("")}
            />}
            {modalName === "request" && <RequestModal
            navigation={navigation}
                details={selectedRequest}
                onClosePress={() => setModalName("")}
                onSuccess={(message) => {
                    setModalName("")
                    dispatch(setToastMessage({
                        type: "success",
                        message: message
                    }))
                    getContacts(userId)
                }}
                onError={(message) => {
                    setModalName("")
                    dispatch(setToastMessage({
                        type: "error",
                        message: message
                    }))
                    getContacts(userId)
                }}
            />}
            <ToastMessage />
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
        </SafeAreaView>
    )
}

export default Contacts;