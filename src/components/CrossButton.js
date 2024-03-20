import React from 'react';
import {
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import newColors from '../utils/newColors';
import Icons from '../assets/icons';

const CrossButton = ({
    mainContainer,
    onPress
}) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={onPress}>
            <Image
                source={Icons.crossIcon}
                style={styles.iconStyle}
            />
        </TouchableOpacity>
    )
}

export default CrossButton;

const styles = StyleSheet.create({
    mainContainer: {
        padding:10
    },
    iconStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: newColors.appWhite
    },
})