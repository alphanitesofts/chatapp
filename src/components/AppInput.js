import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';
import { useSelector } from 'react-redux';
import theme from '../theme';
import newColors from '../utils/newColors';
import Loader from './Loader';

const AppInput = ({
    title,
    titleAllCaps,
    defaultValue,
    onChange,
    placeholder,
    mainContainer,
    inputContainer,
    placeholderTextColor,
    returnKeyLabel,
    returnKeyType,
    onSubmitEditing,
    warningMessage,
    secureTextEntry,
    onIconPress,
    iconSource,
    editable,
    disableIconButton,
    rightIcon,
    placeholderAllCaps,
    iconSourceTintColor,
    rightIconStyle,
    isLoading
}) => {

    const [value, setValue] = useState('')
    const { appTheme } = useSelector(state => state.userSession)

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    return (
        <View style={{ width: '100%', flexDirection: "column" }}>
            <View style={[styles.mainContainer, mainContainer,]}>
                {rightIcon && <Image
                    source={rightIcon}
                    style={[{
                        width: 18,
                        height: 14.08,
                        resizeMode: 'contain',
                        tintColor: newColors.appInputText,
                    }, rightIconStyle]}
                />}
                <TextInput
                    style={[styles.innerInputContainer, inputContainer]}
                    placeholder={placeholder ? placeholder : placeholderAllCaps ? placeholder?.toUpperCase() : 'Type here'}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : newColors.appInputText}
                    onChangeText={(text) => {
                        setValue(text)
                        onChange && onChange(text)
                    }}
                    value={value}
                    returnKeyLabel={returnKeyLabel}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    autoCapitalize="none"
                    editable={editable}
                    secureTextEntry={secureTextEntry}
                />
                {iconSource && !isLoading ? <TouchableOpacity style={styles.iconContainer} onPress={onIconPress} disabled={disableIconButton}>
                    <Image
                        source={iconSource}
                        style={[{
                            width: 18,
                            height: 14.08,
                            resizeMode: 'contain',
                            tintColor: newColors.appInputText
                        }, iconSourceTintColor]}
                    />
                </TouchableOpacity>
                    :
                    <View style={{ width: 'auto', marginLeft: 'auto', marginRight: 10 }}>
                        <Loader
                            loading={isLoading}
                            isShowIndicator={true}
                            size={"small"}
                        />
                    </View>}
            </View>
            {warningMessage && <View style={styles.messageContainer}>
                <Text style={styles.warningMessageText}>{warningMessage}</Text>
            </View>}
        </View>
    )
}

export default AppInput;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 65.52,
        borderRadius: 12.84,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        backgroundColor: newColors.appInputBg
    },
    innerInputContainer: {
        width: '80%',
        height: '100%',
        fontSize: 15,
        borderRadius: 15,
        marginLeft: 15,
        color: newColors.appInputText,
    },
    messageContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    warningMessageText: {
        color: colors.warningRed,
        marginLeft: 5,
        fontSize: 13,
        fontWeight: "600"
    },
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: 'center',
        marginLeft: 'auto',
        justifyContent: 'center'
    }
})