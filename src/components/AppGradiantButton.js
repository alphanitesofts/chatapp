import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

const AppGradiantButton = ({
    title,
    titleAllCaps,
    onPress,
    titleColor,
    outerContainer
}) => {
    return (
        <TouchableOpacity style={[styles.outerContainer, outerContainer]} onPress={onPress}>
            <LinearGradient
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                colors={[colors.logoBlue, colors.appPurple, colors.logoPink]}
                style={styles.mainContainer}
            >
                <Text style={[styles.titleText, titleColor]}>
                    {titleAllCaps ? title?.toUpperCase() : title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default AppGradiantButton

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center'
    },
    mainContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },
    titleText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.appWhite
    },
})