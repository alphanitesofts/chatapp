import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import newColors from '../utils/newColors';
import fonts from '../../assets';

const AppGrayButton = ({
    title,
    titleAllCaps,
    onPress,
    mainContainer,
    titleColor,
    disabled
}) => {

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer,]} disabled={disabled} onPress={onPress}>
            <Text style={[styles.titleText, titleColor]}>
                {titleAllCaps ? title?.toUpperCase() : title}</Text>
        </TouchableOpacity>
    )
}

export default AppGrayButton;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.appInputBg,
        height: 65.52,
        borderRadius: 12.84,
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600',
        color: newColors.appButtonText,
        fontFamily: fonts.PoppinsRegular
    },
})