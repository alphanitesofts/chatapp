import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import Images from '../../assets/images';
import AppButton from '../../components/AppButton';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';

const PrivateGroupChatCard = ({
    item,
    onMembersPress,
    onLeavePress,
    onItemPress
}) => {


    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={{ width: '100%', alignItems: 'center' }} onPress={onItemPress}>
                <Text style={{
                    fontSize: 18,
                    fontWeight: "600",
                    color: newColors.appWhite,
                    position: "absolute",
                    top: 8,
                    right: 10,
                    lineHeight: 21.6,
                    fontFamily: fonts.PoppinsRegular
                }}>{item?.group_members_count || "--"}</Text>
                <Image
                    source={Images.sampleProfile}
                    style={styles.renderImageStyle}
                />
                <Text style={styles.groupNameText}>{item?.group_name&& item?.group_name?.substring(0, 5)?.concat("...") || "--"}</Text>
                <Text style={styles.dateText}>{item?.Idate || "--"}</Text>
            </TouchableOpacity>
            <AppButton
                title={"Members"}
                onPress={onMembersPress}
            />
            <AppButton
                title={"Leave"}
                onPress={onLeavePress}
                mainContainer={{ marginTop: 10 }}
            />
        </View>
    )
}

export default PrivateGroupChatCard

const styles = StyleSheet.create({
    mainContainer: {
        width: '48%',
        marginRight: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 15,
        backgroundColor: newColors.popupBg
    },
    renderImageStyle: {
        width: 65,
        height: 65,
        resizeMode: 'cover',
        borderRadius: 100
    },
    groupNameText: {
        fontSize: 18,
        fontWeight: "600",
        color: newColors.appWhite,
        textAlign: 'center',
        marginBottom: 5,
        fontFamily: fonts.PoppinsRegular
    },
    dateText: {
        fontSize: 9,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsItalic,
        fontWeight: '700',
        marginBottom: 5
    }
})