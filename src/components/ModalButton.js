import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import theme from '../theme';

const ModalButton = ({
    onPress,
    title,
    titleAllCaps
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    const styles = getModalButtonStyles(appTheme)

    return (
        <TouchableOpacity style={styles.mainContainer} onPress={onPress}>
            <Text style={styles.titleText}>{title && titleAllCaps ? title?.toUpperCase() : title}</Text>
        </TouchableOpacity>
    )
}

export default ModalButton;

const getModalButtonStyles = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            width: "50%",
            height: 45,
            borderWidth: 1,
            borderColor: appTheme === "light" ? theme.light.borderColor : theme.dark.borderColor,
            borderRadius: 15,
            marginBottom: 100,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20%'
        },
        titleText: {
            color: theme.dark.textColor,
            fontWeight: '500',
            letterSpacing: 15,
            textAlign: 'center',
            fontSize: 15
        }
    })
}