import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Loader from '../../components/Loader';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import AppGrayButton from '../../components/AppGrayButton';
import { fetchAllUsers, postContactRequest } from '../../api/methods/auth';
import { setToastMessage } from '../../redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Images from '../../assets/images';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import ToastMessage from '../../components/ToastMessage';


const AddContactModal = ({
    onClosePress,
    onCheckDetails
}) => {

    const { userId } = useSelector(state => state.userSession)
    const dispatch = useDispatch()

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllUsers()
    }, [])


    const getAllUsers = async () => {
        setLoading(true)
        try {
            const response = await fetchAllUsers()
            if (response?.data?.status === "200") setList(response?.data?.Users)
        } catch (error) {
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.message
            }))
        } finally {
            setLoading(false)
        }
    }

    const sendContactRequest = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("requester_id", userId)
            formData.append("requested_id", id)
            formData.append("status", "pending")
            const response = await postContactRequest(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setTimeout(()=>{
                    onClosePress&&onClosePress()
                },1000)
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

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.renderContainer, { borderBottomWidth: 1 }]}>
                <TouchableOpacity 
                
                onPress={()=> onCheckDetails(item)}
                style={styles.rowContainer}>
                    <ImageComponent
                        source={item?.image !== "default" && item?.image !== "null" ? `${IMAGE_URL}/${item?.image}` : Images.placeholder}
                        mainStyle={{
                            width: 30,
                            height: 30,
                            borderRadius: 100
                        }}
                        alternate={Images.placeholder}
                    />
                    <Text style={styles.nameText}>{item?.username}</Text>
                    <TouchableOpacity style={styles.requestButtonContainer} onPress={() => sendContactRequest(item.id)}>
                        <Text style={styles.sendText}>Send Request</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                    <Text style={styles.headingText}>Available Users</Text>
                </View>
                <View style={{ width: '100%', height: '75%', marginVertical: 15 }}>
                    <FlatList
                        data={list}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
                <AppGrayButton
                    title={"Close"}
                    titleAllCaps={true}
                    onPress={onClosePress}
                    mainContainer={{marginTop:'auto'}}
                />
            </View>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </View>

    )
}

export default AddContactModal;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: 'rgba(10, 10, 10, 0.7)'
    },
    borderContainer: {
        width: '90%',
        height: '70%',
        padding: 20,
        marginTop: 30,
        borderRadius: 10,
        justifyContent: 'center',
        backgroundColor: newColors.popupBg,
    },
    headingText: {
        fontSize: 18,
        fontWeight: '600',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold,
    },
    crossButton: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    crossButtonStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: newColors.appWhite
    },
    renderContainer: {
        width: '100%',
        borderColor: newColors.grayWhiteBg,
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 14,
        fontWeight: '600',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsMedium,
        marginLeft: 15
    },
    requestButtonContainer: {
        paddingHorizontal: 15,
        height: 30,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: newColors.darkBorderColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto'
    },
    sendText: {
        color: newColors.appWhite,
        fontSize: 12,
        fontWeight: '600',
        fontFamily: fonts.PoppinsBold
    }
})