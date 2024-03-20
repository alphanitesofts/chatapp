import React, { useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import colors from '../../utils/colors';
import theme from '../../theme';
import AppButton from '../../components/AppButton';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';

const DATA = ["0", "1", "2", "3", "4", "5", "6"]

const ContactSelectionModal = ({
    appTheme,
    onNextPress
}) => {

    const styles = getContactModalStyles(appTheme)

    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.renderContainer}>
                <LinearGradient
                    colors={[colors.logoPink, colors.logoPink, colors.logoPink]}
                    style={{
                        width: 55,
                        height: 55,
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
                <Text style={styles.renderText}>John Doe</Text>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <Text style={styles.visibleHeadingText}>VISIBLE TO</Text>
                <View style={styles.roundContainer}>
                    <Text style={styles.contactText}>Contact</Text>
                </View>
                <View style={{width:'100%', height:240, paddingBottom:20}}>
                    <FlatList
                        data={DATA}
                        numColumns={2}
                        contentContainerStyle={{ width: '100%', }}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index}
                    />
                </View>
                <AppButton
                    title={"Next"}
                    needGradiant={true}
                    mainContainer={{ width: '80%', }}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onNextPress}
                />
            </View>
        </View>

    )
}

export default ContactSelectionModal;

const getContactModalStyles = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            width: '100%',
            height: '110%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            zIndex: 50,
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
        visibleHeadingText: {
            fontSize: 15,
            fontWeight: '800',
            color: appTheme==="light"?theme.light.textColor:theme.dark.textColor
        },
        roundContainer: {
            paddingHorizontal: 5,
            paddingVertical: 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: appTheme === "light" ? theme.light.borderColor : theme.dark.borderColor,
            marginVertical: 10
        },
        contactText: {
            fontWeight: '500',
            color: appTheme==="light"?theme.light.textColor:theme.dark.textColor
        },
        renderContainer: {
            width: '40%',
            marginHorizontal: 10,
            marginVertical: 15,
            alignSelf: 'center',
            alignItems: 'center'
        },
        imageStyle: {
            width: 50,
            height: 50,
            resizeMode: 'cover',
            borderRadius: 100
        },
        renderText: {
            color: appTheme==="light"?theme.light.textColor:theme.dark.textColor,
            fontWeight: '600',
            marginTop: 10
        }
    })
}