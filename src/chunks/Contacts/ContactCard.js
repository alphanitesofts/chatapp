import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Images from '../../assets/images';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';

const ContactCard = ({
    item,
    onPress
}) => {

    return (
        <TouchableOpacity style={styles.renderContainer} onPress={() => onPress && onPress(item)}>
            <ImageComponent
                source={`${IMAGE_URL}/${item?.requester_id_image}`}
                alternate={Images.sampleProfile}
                mainStyle={styles.renderImageStyle}
            />
            <View style={styles.detailContainer}>
                <Text style={styles.chatNameText}>{item?.requester_id_name || "--"}</Text>
                <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.locationText}>{item?.requester_id_location || "--"}</Text>
                    <Text style={styles.dateText}>{item?.Idate || "--"}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ContactCard;

const styles = StyleSheet.create({
    renderContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 15,
        backgroundColor: newColors.popupBg,
        flexDirection: 'row',
        marginBottom: 15
    },
    renderImageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 100
    },
    detailContainer: {
        width: '80%',
        paddingLeft: 15
    },
    chatNameText: {
        fontSize: 16,
        fontWeight: "600",
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold,
        lineHeight: 24
    },
    locationDetailContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
    },
    locationText: {
        width:'50%',
        fontWeight: "400",
        color: newColors.chatCardGrayText,
        fontSize: 12,
        lineHeight: 18,
        fontFamily: fonts.PoppinsRegular
    },
    chatDescText: {
        fontSize: 10,
        color: newColors.appWhite,
        fontWeight: '400',
        lineHeight: 15,
        fontFamily: fonts.PoppinsRegular
    },
    dateText: {
        fontWeight: "400",
        color: newColors.chatCardGrayText,
        fontSize: 14,
        lineHeight: 21,
        fontFamily: fonts.PoppinsRegular
    }
})