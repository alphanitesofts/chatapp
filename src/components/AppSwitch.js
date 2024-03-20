import React, { useEffect, useState } from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import colors from '../utils/colors';
import { useSelector } from 'react-redux';
import theme from '../theme';
import newColors from '../utils/newColors';
import LinearGradient from 'react-native-linear-gradient';

const AppSwitch = ({
    onChange,
    icon,
    tintColor,
    mainContainer,
    defaultValue,
    title,
    titleAllCaps
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    const [isOn, setIsOn] = useState(false)

    useEffect(() => {
        defaultValue && setIsOn(defaultValue)
    }, [defaultValue])

    return (
        <View style={mainContainer}>
            {title && <Text style={{
                fontSize: 15,
                color: newColors.appWhite,
                marginBottom: 5,
                fontWeight: 'bold'
            }}>{title && titleAllCaps ? title.toUpperCase() : title ? title : ""}</Text>}
            <View style={[styles.mainContainer, {
                backgroundColor: isOn ? newColors.appButtonDarkBg : newColors.switchBg
            }]}>
                <LinearGradient
                    colors={[isOn ? newColors.appButtonLightBg : newColors.switchBg, isOn ? newColors.appButtonDarkBg : newColors.switchBg]}
                    style={[styles.mainContainer, { paddingHorizontal: 5 }]}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                >
                    <TouchableOpacity
                        style={[styles.thumb, {
                            backgroundColor: isOn ? newColors.appWhite : newColors.appButtonDarkBg,
                            marginLeft: isOn && 'auto'
                        }]}
                        onPress={() => {
                            setIsOn(!isOn)
                            onChange && onChange(!isOn)
                        }}
                    >

                        {icon && <Image
                            source={icon}
                            style={[styles.iconStyle, {
                                tintColor: isOn ? newColors.appButtonDarkBg : newColors.appWhite
                            }]}
                        />}
                    </TouchableOpacity>
                </LinearGradient>
            </View>
        </View>

    )
}

export default AppSwitch;

const styles = StyleSheet.create({
    mainContainer: {
        width: 60,
        height: 32,
        borderRadius: 20,
        justifyContent: 'center',
    },
    thumb: {
        width: 26,
        height: 26,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconStyle: {
        width: 16,
        height: 16,
        resizeMode: 'contain',
    }
})