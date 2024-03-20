import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import theme from '../../theme';
import AppButton from '../../components/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { useSelector } from 'react-redux';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';

const ProfileCard = ({
    mainContainer,
    item,
    onProfilePress
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <Image
                source={Images.sampleProfile}
                style={{
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    resizeMode: 'cover'
                }}
            />
            <View style={styles.detailContainer}>
                <Text style={styles.titleText}>Jacob</Text>
                <Text style={styles.positionText}>Developer</Text>
                <Text style={styles.dateText}>March 17 2024</Text>
            </View>
            <AppButton
                title={"Profile"}
                onPress={onProfilePress}
            />
        </View>
    )
}

export default ProfileCard;

const styles = StyleSheet.create({
    mainContainer: {
        width: 166,
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        backgroundColor: newColors.popupBg
    },
    detailContainer: {
        flexDirection: 'column',
        marginVertical: 20
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: 'center',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold
    },
    positionText: {
        fontSize: 10,
        fontWeight: '500',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appButtonDarkBg,
        textAlign: 'center',
        marginVertical: 10
    },
    dateText: {
        fontSize: 9,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsItalic,
        fontWeight: '700',
        marginBottom: 5
    }
})