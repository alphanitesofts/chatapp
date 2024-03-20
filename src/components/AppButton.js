import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import newColors from '../utils/newColors';
import fonts from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

const AppButton = ({
    title,
    titleAllCaps,
    onPress,
    mainContainer,
    titleColor,
    disabled,
    icon
}) => {

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer,]} disabled={disabled} onPress={onPress}>
            <LinearGradient
                colors={[newColors.appButtonLightBg, newColors.appButtonDarkBg]}
                style={styles.innerContainer}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                {icon && <Image
                    source={icon}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                        tintColor: newColors.appWhite,
                        marginRight: 15
                    }}
                />}
                <Text style={[styles.titleText, titleColor]}>
                    {titleAllCaps ? title?.toUpperCase() : title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default AppButton;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 65.52,
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600',
        color: newColors.appButtonText,
        fontFamily: fonts.PoppinsRegular
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        borderRadius: 12.84,
        flexDirection: 'row',
    }
})