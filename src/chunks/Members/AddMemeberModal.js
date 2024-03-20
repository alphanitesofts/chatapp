import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import AppButton from '../../components/AppButton';
import newColors from '../../utils/newColors';
import Icons from '../../assets/icons';
import fonts from '../../../assets';
import Loader from '../../components/Loader';
import ToastMessage from '../../components/ToastMessage';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/actions/actions';
import { fetchAllUsers } from '../../api/methods/auth';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import Images from '../../assets/images';


const AddMemberModal = ({
    onCrossPress,
    onConfirmPress,
    onChange,
    joinedMembers
}) => {

    const dispatch = useDispatch()

    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        list && list?.length > 0 && onChange && onChange(list?.filter((item) => item.isSelected).map((e) => `${e.id}`))
    }, [list])

    useEffect(() => {
        getAllUsers()
    }, [])


    const getAllUsers = async () => {
        setLoading(true)
        try {
            const response = await fetchAllUsers()
            if (response?.data?.status === "200") {
                const filteredList = response?.data?.Users?.filter((item) => !joinedMembers.some((e) => e.id === item.id))
                setList(filteredList)
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
                <View style={styles.rowContainer}>
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
                    <TouchableOpacity style={styles.roundContainer}
                        onPress={() => setList((prevList) => prevList?.map((e) => e.id === item.id ? {
                            ...e,
                            isSelected: !e.isSelected
                        } : e))}
                    >
                        {item?.isSelected && <View style={styles.innerRoundContainer}></View>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={styles.confirmHeadingText}>Add Memebers</Text>
                    <TouchableOpacity style={styles.crossButtonContainer} onPress={onCrossPress}>
                        <Image
                            source={Icons.crossIcon}
                            style={styles.crossButtonIcon}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ width: '100%', height: '70%', marginVertical: 15 }}>
                    <FlatList
                        data={list}
                        keyExtractor={item => item.id}
                        renderItem={renderItem}
                    />
                </View>
                <AppButton
                    title={"Confirm"}
                    needGradiant={true}
                    mainContainer={{ height: 45, marginTop: 'auto' }}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onConfirmPress}
                />
            </View>
            <ToastMessage />
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
        </View>

    )
}

export default AddMemberModal;

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
        height: '50%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: newColors.popupBg,
    },
    confirmHeadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: newColors.appWhite,
    },
    crossButtonContainer: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    crossButtonIcon: {
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
    roundContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: newColors.appButtonDarkBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginLeft: 'auto'
    },
    innerRoundContainer: {
        width: 12,
        height: 12,
        backgroundColor: newColors.appButtonDarkBg,
        borderRadius: 100
    }
})