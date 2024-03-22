import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import theme from '../../theme';
import { useSelector } from 'react-redux';
import Images from '../../assets/images';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';

const ChatListCard = ({
    item,
    onPress
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    return (
        <TouchableOpacity style={styles.renderContainer} onPress={() => onPress && onPress(item)}>
            <ImageComponent
                source={`${IMAGE_URL}/${item?.image}`}
                mainStyle={styles.renderImageStyle}
                alternate={Images.sampleProfile}
            />
            <View style={styles.detailContainer}>
                <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.chatNameText}>{item?.username || "--"}</Text>
                    {/* <Text style={styles.dateText}>07/18/2022</Text> */}
                </View>
            {/* <Text style={styles.locationText}>Mobile</Text> */}
                <Text style={styles.chatDescText}>{item?.message}</Text> 
            </View>
        </TouchableOpacity>
    )
}

export default ChatListCard;

const styles = StyleSheet.create({
    renderContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 15,
        backgroundColor: newColors.popupBg,
        flexDirection: 'row',
        marginBottom: 15,
        alignItems:'center'
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