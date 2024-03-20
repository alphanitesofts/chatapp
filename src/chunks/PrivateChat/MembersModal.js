import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import AppButton from '../../components/AppButton';
import Images from '../../assets/images';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import { fetchGroupMembers } from '../../api/methods/auth';
import Loader from '../../components/Loader';
import { useDispatch } from 'react-redux';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';
import Icons from '../../assets/icons';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';


const MembersModal = ({
    onClosePress,
    groupId
}) => {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState()

    useEffect(() => {
        groupId && getGroupMemberDetails(groupId)
    }, [groupId])

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

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.renderContainer}>
                <ImageComponent
                    source={`${IMAGE_URL}/${item?.image}`}
                    alternate={Images.placeholder}
                    mainStyle={styles.imageStyle}
                />
                <Text style={styles.renderText}>{item?.username}</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <View style={{ width: '100%', height: 240, paddingBottom: 20 }}>
                    <FlatList
                        data={details}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                        ListEmptyComponent={() => {
                            if (loading) return
                            else
                                return (
                                    <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <Image
                                            source={Icons.peopleIcon}
                                            style={{ width: 80, height: 80, resizeMode: 'contain', tintColor: newColors.appWhite }}

                                        />
                                        <Text style={{
                                            color: newColors.appWhite,
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            fontFamily: fonts.PoppinsBold,
                                            marginTop: 15
                                        }}>No Memebers Found</Text>
                                    </View>
                                )

                        }}
                    />
                </View>
                <AppButton
                    title={"Close"}
                    needGradiant={true}
                    mainContainer={{ width: '80%', }}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onClosePress}
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

export default MembersModal;

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
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.popupBg
    },
    roundContainer: {
        paddingHorizontal: 5,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10
    },
    renderContainer: {
        width: '100%',
        marginHorizontal: 10,
        marginVertical: 15,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderColor: newColors.darkBorderColor,
        padding: 5
    },
    imageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 3,
        borderColor: newColors.appButtonDarkBg
    },
    renderText: {
        fontSize: 12.9,
        fontFamily: fonts.PoppinsRegular,
        color: newColors.appWhite,
        lineHeight: 15.48,
        fontWeight: '500',
        marginLeft: 10
    }
})