import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import colors from '../utils/colors';
import { useSelector } from 'react-redux';
import theme from '../theme';
import newColors from '../utils/newColors';

const TextArea = ({
    title,
    titleAllCaps,
    mainStyle,
    placeholder,
    keyboardType,
    editable,
    onChange,
    defaultValue,
    placeholderColor,
    inputContainer,
    inputField
}) => {

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={styles.titleStyle}>{titleAllCaps ? title?.toUpperCase() : title}</Text>}
            <View style={[styles.inputContainer, inputContainer]}>
                <TextInput
                    style={[styles.inputField, inputField]}
                    placeholderTextColor={placeholderColor ? placeholderColor : newColors.appInputText}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    editable={editable}
                    value={defaultValue}
                    placeholder={placeholder || "Type here"}
                    multiline={true}
                    onChangeText={(text) => onChange && onChange(text)}
                />
            </View>
        </View>
    )
}

export default TextArea;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: "column",
    },
    titleStyle: {
        fontSize: 14,
        marginBottom: 10,
        color: colors.appBlack
    },
    inputContainer: {
        width: "100%",
        height:50,
        borderRadius: 12.84,
        paddingHorizontal: 5,
    },
    inputField: {
        fontSize:15,
        width: "100%",
        height: "auto",
        marginTop: 5,
        marginLeft: 5,
        color: newColors.appInputText
    }
})