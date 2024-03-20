import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import newColors from '../utils/newColors';
import fonts from '../../assets';
import LinearGradient from 'react-native-linear-gradient';

const AppGreenButton = ({
    title,
    titleAllCaps,
    onPress,
    mainContainer,
    titleColor,
    disabled
}) => {


    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer,]} disabled={disabled} onPress={onPress}>
            <LinearGradient
                colors={[newColors.appButtonLightGreenBg, newColors.appButtonDarkGreenBg]}
                style={styles.innerContainer}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
                <Text style={[styles.titleText, titleColor]}>
                    {titleAllCaps ? title?.toUpperCase() : title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default AppGreenButton;

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
    }
})