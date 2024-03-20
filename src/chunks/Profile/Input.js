import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';
import { useSelector } from 'react-redux';
import theme from '../../theme';

const Input = ({
    placeholder,
    onTextChange,
    mainContainer,
    defaultValue,
    needBottomBorder,
    editable
}) => {

    const { appTheme } = useSelector(state => state.userSession)
    const [value, setValue] = useState("")

    useEffect(() => {
        defaultValue && setValue(defaultValue)
    }, [defaultValue])

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <LinearGradient
                colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                style={styles.gradiantView}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            >
            </LinearGradient>
            <TextInput
                style={[styles.inputContainer, {
                    backgroundColor: appTheme === "light" ? theme.light.backgroundColor : theme.dark.backgroundColor,
                    color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                }]}
                placeholder={placeholder?.toUpperCase()}
                placeholderTextColor={appTheme === "light" ? theme.light.placeholder : theme.dark.placeholder}
                value={value}
                editable={editable}
                onChangeText={(text) => {
                    setValue(text)
                    onTextChange && onTextChange(text)
                }}
            />
            {needBottomBorder && <LinearGradient
                colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                style={styles.gradiantView}
                start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
            >
            </LinearGradient>}
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        padding: 5
    },
    gradiantView: {
        height: 2,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    inputContainer: {
        width: '100%',
        height: 45,
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 10
    }
})