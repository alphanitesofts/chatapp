import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import Icons from '../assets/icons';
import newColors from '../utils/newColors';

const BackButton = ({
    onPress,
    mainContainer
}) => {
    return (
        <TouchableOpacity style={[styles.triangleButtonContainer, mainContainer]}
            onPress={onPress}>
            <Image
                source={Icons.arrowIcon}
                style={{
                    width: 15,
                    height: 15,
                    resizeMode: 'contain',
                    transform: [{ rotate: '270deg' }],
                }}
            />
        </TouchableOpacity>
    )
}

export default BackButton;

const styles = StyleSheet.create({
    triangleButtonContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.grayWhiteBg,
        borderRadius: 15,
    },
})