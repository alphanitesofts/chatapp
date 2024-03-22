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
import { fetchUserContacts } from '../../api/methods/auth';
import Selector from '../../chunks/PublicChat/Selector';
const Contacts = ({ navigation }) => {

    const { appTheme, userId } = useSelector(state => state.userSession)

    const isFocused = useIsFocused()
    const dispatch = useDispatch()

    const [modalName, setModalName] = useState("")
    const [modalNameI, setModalNameI] = useState("")

    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [selesction,setSelection]=useState("1")
    const [contactList,setContactList]=useState([])
    const [selectedRequest, setSelectedRequest] = useState()
    const [identifier, setIdentifier] = useState("contact")

    useEffect(() => {
        if (isFocused && userId) {
            getUserContacs(userId)
            getContacts(userId)
        }
    }, [isFocused, userId])

    const getContacts = async (id) => {
        // setLoading(true)
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
    const getUserContacs = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("user_id", id)
            const response = await fetchUserContacts(formData)
            if (response?.data?.status === "200") {
console.log(response?.data?.contact_data)
                setContactList(response?.data?.contact_data)
            }
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
            // getPrivateGroups(userId)
        }
    }

    const renderItem = ({ item, index }) => {
        return (
            <ContactCard
                item={item}
                onPress={(selectedItem) => {
                    setSelectedRequest(selectedItem)
                    setModalNameI("request")
                }}
            />
        )
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.headerStyle}>
                <Text style={styles.titleText}>Contacts</Text>
                <TouchableOpacity style={styles.plusContainer} onPress={() => {
                    setIdentifier("send_request")
                    setModalName("add")}}>
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
            <Selector
                    items={[
                        { id: "1", label: "Contacts", },
                        { id: "2", label: "Requests" },
                    ]}
                    keyToRender={"label"}
                    appTheme={appTheme}
                    defaultValue={selesction}
                    onChange={(item) => {
                        
              setIdentifier(item?.id === "1"? "contact":"request")
                        setSelection(item?.id)
                    
                    }}
                    mainStyle={{ marginBottom: 5 }}
                />
            <FlatList
                renderItem={renderItem}
                data={selesction === "1" ?contactList : list}
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
                onClosePress={() => {setModalName("")
            setIdentifier(selesction === "1"?"contact": "request")
            }}
                onCheckDetails={(val)=>{
                    setSelectedRequest(val)
                    // setIdentifier("request")
                    setModalNameI("request")

                }}
            />}
            {modalNameI === "request" && 
            <RequestModal
            navigation={navigation}
                details={selectedRequest}
                onClosePress={() => setModalNameI("")}
                onSuccess={(message) => {
                    setModalNameI("")
                    dispatch(setToastMessage({
                        type: "success",
                        message: message
                    }))
                    getContacts(userId)
                }}
                onError={(message) => {
                    setModalNameI("")
                    dispatch(setToastMessage({
                        type: "error",
                        message: message
                    }))
                    getContacts(userId)
                }}
                identifier={identifier}
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