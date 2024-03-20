import React, { Component } from 'react';

import {
    Platform,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import _ from 'lodash'
import colors from '../utils/colors';
import { connect } from 'react-redux';
import theme from '../theme';

// import { light } from '../common/theme';

const mapStateToProps = (state) => {
    return {
        appTheme: state.userSession.appTheme, // Replace 'appTheme' with the actual name of the state you want to access
    };
};
class FloatingLabelInputField extends Component {
    state = {
        isFocused: false
    }
    render() {
        const {
            inputContainer,
            onParentPress,
            inputStyle,
            fieldRef,
            value,
            placeholder,
            onChangeText,
            onSubmitEditing,
            onFocus,
            onKeyPress,
            leftIcon,
            rightIcon,
            rightText,
            leftIconStyle,
            rightIconStyle,
            onRightIconPress,
            rightIconContainerStyle,
            hideLabel,
            labelStyle,
            labelContainerStyle,
            placeholderTextColor,
            leftComponent,
            appTheme
        } = this.props
        const { isFocused } = this.state

        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    if (this.textInputLocalRef) this.textInputLocalRef.focus()
                    if (onParentPress && typeof onParentPress == 'function') onParentPress()
                }}
                style={[styles.inputContainer, inputContainer, { borderColor: appTheme === "light" ? theme.light.otpBorder : theme.dark.otpBorder }]}>
                {leftComponent ?
                    leftComponent
                    :
                    leftIcon &&
                    <Image
                        style={[styles.iconStyle, { marginRight: 5 }, leftIconStyle]}
                        source={leftIcon}
                    />
                }
                {!hideLabel && (isFocused || value?.length > 0) &&
                    <View
                        style={[{ position: 'absolute', top: -10, marginLeft: 10, backgroundColor: colors.appWhite, paddingHorizontal: 5 }, labelContainerStyle]}>
                        <Text style={[{}, labelStyle]}>
                            {placeholder}
                        </Text>
                    </View>
                }
                <TextInput
                    {...this.props}
                    ref={ref => {
                        this.textInputLocalRef = ref
                        if (fieldRef && typeof fieldRef == 'function') fieldRef(ref)
                    }}
                    style={[styles.inputStyle, inputStyle, { color: colors.appWhite, fontFamily: 'Avenir Heavy' }]}
                    value={value}
                    placeholder={isFocused ? '' : placeholder || "X"}
                    placeholderTextColor={colors.appWhite}
                    onChangeText={(text) => {
                        if (onChangeText && typeof onChangeText == 'function') onChangeText(text)
                    }}
                    onSubmitEditing={() => {
                        if (onSubmitEditing && typeof onSubmitEditing == 'function') onSubmitEditing()
                    }}
                    onFocus={(event) => {
                        this.setState({ isFocused: true })
                        if (onFocus && typeof onFocus == 'function') onFocus(event)
                    }}
                    onBlur={(event) => {
                        this.setState({ isFocused: false })
                    }}
                    onKeyPress={({ nativeEvent }) => { if (onKeyPress && typeof onKeyPress == 'function') onKeyPress(nativeEvent) }}
                />
                {
                    rightIcon &&
                    <TouchableOpacity
                        disabled={_.isNil(onRightIconPress)}
                        style={[{ padding: 10 }, rightIconContainerStyle]}
                        onPress={() => {
                            if (onRightIconPress) onRightIconPress()
                        }}>
                        {rightText ?
                            <Text style={{}}>{rightText}</Text>
                            :
                            <Image
                                style={[styles.iconStyle, rightIconStyle]}
                                source={rightIcon}
                            />
                        }
                    </TouchableOpacity>
                }
            </TouchableOpacity >
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',
        // backgroundColor: 'white',
        margin: 20,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 8,
        // backgroundColor:'#F5F6FA',
        alignSelf: 'center',

    },
    labelContainerStyle: {
        // backgroundColor:'red'
    },
    inputStyle: {
        flex: 1,
    },
    iconStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }
})

export default connect(mapStateToProps)(FloatingLabelInputField);
