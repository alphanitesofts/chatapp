import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text
} from 'react-native';
import colors from '../../utils/colors';
import theme from '../../theme';
import Icons from '../../assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';
import AppButton from '../../components/AppButton';

const AcceptRequestModal = ({
    appTheme,
    onCrossPress
}) => {

    const styles = getChatModalStyles(appTheme)
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <TouchableOpacity style={styles.crossButton} onPress={onCrossPress}>
                    <Image
                        source={Icons.crossIcon}
                        style={styles.crossIconStyle}
                    />
                </TouchableOpacity>
                <LinearGradient
                    colors={[colors.logoPink, colors.logoPink, colors.logoPink]}
                    style={{
                        width: 105,
                        height: 105,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 100
                    }}
                >
                    <Image
                        source={Images.sampleProfile}
                        style={styles.imageStyle}
                    />
                </LinearGradient>
                <Text style={styles.groupNameText}>ADMIN</Text>
                <Text style={styles.chatNameText}>Chat Name</Text>
                <Text style={styles.dateLocationText}>Amsterdam, Netherland April 18 2022</Text>
                <AppButton
                    title={"Request"}
                    mainContainer={{ width: '80%', }}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                />
            </View>
        </View>

    )
}

export default AcceptRequestModal;

const getChatModalStyles = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            width: '100%',
            height: '110%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex:50,
            backgroundColor: 'rgba(10, 10, 10, 0.7)'
        },
        borderContainer: {
            width: '80%',
            padding: 20,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: appTheme === "light" ? theme.light.backgroundColor : theme.dark.backgroundColor,
        },
        crossButton: {
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0
        },
        crossIconStyle: {
            width: 12,
            height: 12,
            resizeMode: 'contain',
            tintColor: appTheme === "light" ? theme.dark.backgroundColor : theme.light.backgroundColor
        },
        imageStyle: {
            width: 100,
            height: 100,
            resizeMode: 'cover',
            borderRadius: 100
        },
        groupNameText: {
            fontSize: 20,
            fontWeight: '500',
            color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor,
            marginTop: 15
        },
        chatNameText: {
            fontSize: 16,
            color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor,
        },
        dateLocationText: {
            marginVertical: 15,
            color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor,
        }
    })
}