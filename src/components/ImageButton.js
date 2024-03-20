import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import newColors from '../utils/newColors';

const ImageButton = ({
    onPress,
    source,
    mainContainer
}) => {
    return (
        <TouchableOpacity style={[styles.mainContainer,mainContainer]} onPress={onPress}>
            <Image
                source={source}
                style={styles.iconStyle}
            />
        </TouchableOpacity>
    )
}

export default ImageButton

const styles = StyleSheet.create({
    mainContainer: {
        width: 48,
        height: 48,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.imageButtonBg
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }
})