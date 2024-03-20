import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import AppButton from '../../components/AppButton';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import { IMAGE_URL } from '../../api/config';
import ImageComponent from '../../components/ImageComponent';
import Loader from '../../components/Loader';
import { updateContactRequestStatus } from '../../api/methods/auth';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import AppGreenButton from '../../components/AppGreenButton';
import AppGrayButton from '../../components/AppGrayButton';

const ActionButton = ({
    icon,
    onPress,
    mainContainer,
    iconStyle
}) => {
    return (
        <TouchableOpacity style={[styles.actionButtonContainer, mainContainer]} onPress={onPress}>
            <Image
                source={icon}
                style={[styles.actionIcon, iconStyle]}
            />
        </TouchableOpacity>
    )
}

const RequestModal = ({
    onSuccess,
    onClosePress,
    details,
    onError,
    navigation
}) => {

    useEffect(()=>{
        console.log("details==>>",details);
    },[details])

    const [loading, setLoading] = useState(false)

    const updateContactRequest = async (status) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("id", details?.id)
            formData.append("status", status)
            const response = await updateContactRequestStatus(formData)
            if (response?.data?.status === "200") {
                onSuccess && onSuccess(response?.data?.message)
            }
        } catch (error) {
            onError && onError(error?.response?.data?.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
                    <ImageComponent
                        source={`${IMAGE_URL}/${details?.requester_id_image}`}
                        alternate={Images.sampleProfile}
                        mainStyle={{ borderRadius: 100 }}
                    />
                    <Text style={styles.requstNameText}>{details?.requester_id_name || "--"}</Text>
                    <Text style={styles.positionText}>{details?.requester_id_location || "--"}</Text>
                    <Text style={styles.dateText}>{details?.Idate || "--"}</Text>
                    <View style={styles.rowContainer}>
                        <ActionButton
                            icon={Icons.messageIcon}
                            onPress={() => {
                                onClosePress && onClosePress()
                                navigation.navigate("PrivateMessageChat", { chatDetails: details })
                            }}
                        />
                        <ActionButton
                            icon={Icons.userIcon}
                            mainContainer={{ marginHorizontal: 15 }}
                            onPress={() => {
                                onClosePress && onClosePress()
                                navigation.navigate("OtherUserDetails", { otherUserId: details?.requester_id })
                            }}
                        />
                        <ActionButton
                            icon={Icons.questionMark}
                        />
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AppButton
                        title={"Decline"}
                        titleAllCaps={true}
                        needGradiant={true}
                        onPress={() => updateContactRequest("rejected")}
                        mainContainer={{ width: '48%' }}
                    />
                    <AppGreenButton
                        title={"Accept"}
                        titleAllCaps={true}
                        needGradiant={true}
                        onPress={() => updateContactRequest("accepted")}
                        mainContainer={{ marginVertical: 15, width: '48%' }}
                    />
                </View>
                <AppGrayButton
                    title={"Close"}
                    titleAllCaps={true}
                    onPress={onClosePress}
                />
            </View>
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
        </View>

    )
}

export default RequestModal;

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
        backgroundColor: newColors.popupBg,
    },
    requstNameText: {
        fontSize: 28.91,
        color: newColors.appWhite,
        lineHeight: 34.69,
        fontWeight: '600',
        fontFamily: fonts.PoppinsBold,
        marginTop: 15
    },
    positionText: {
        fontSize: 16.06,
        fontWeight: '500',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appButtonDarkBg,
        textAlign: 'center',
        lineHeight: 32.12
    },
    dateText: {
        fontSize: 14.45,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsItalic,
        fontWeight: '700',
        lineHeight: 32.12
    },
    rowContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    actionButtonContainer: {
        width: 45,
        height: 45,
        backgroundColor: newColors.imageButtonBg,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        tintColor: newColors.appWhite
    }
})