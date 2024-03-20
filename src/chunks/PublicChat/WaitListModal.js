import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import theme from '../../theme';
import NetworkCard from './NetworkCard';
import Icons from '../../assets/icons';

const DATA = ["0", "1"]

const WaitListModal = ({
    appTheme,

}) => {

    const styles = getContactModalStyles(appTheme)

    const renderItem = ({ item, index }) => {
        return (
            <NetworkCard
                appTheme={appTheme}
                mainContainer={{ width: '48%', marginBottom: 20 }}
                item={item}
                key={index}
                firstButtonTitle={"Decline"}
                secondButtonTitle={"Accept"}
                onFirstButtonPress={() => Alert.alert("")}
                onSecondButtonPress={() => Alert.alert("")}
            />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{ width: '100%', alignItems: 'center', }}>
                <FlatList
                    data={DATA}
                    numColumns={2}
                    contentContainerStyle={{ width: '100%',  }}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>

    )
}

export default WaitListModal;

const getContactModalStyles = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal:15
        },
        titleText: {
            fontSize: 13,
            letterSpacing: 10,
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 15
        },
        crossButton: {
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            right: 0
        },
        crossIconStyle: {
            width: 12,
            height: 12,
            resizeMode: 'contain',
            tintColor: appTheme === "light" ? theme.dark.backgroundColor : theme.light.backgroundColor
        },
    })
}