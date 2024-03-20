import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList,
    Platform
} from 'react-native';
import Icons from '../../assets/icons';
import ProfileCard from './ProfileCard';
import newColors from '../../utils/newColors';

const DATA = [
    { id: 1, label: "James" },
    { id: 2, label: "Andrew Smith" },
    { id: 3, label: "Jacob" },
    { id: 4, label: "Mike Ast" },
    { id: 5, label: "Prat James" },
    { id: 6, label: "Chats" },
]

const ProfileCardModal = ({
    appTheme,
    onCrossPress,
}) => {

    const renderItem = ({ item, index }) => {
        return (
            <ProfileCard
                mainContainer={{ marginHorizontal: 8, marginVertical: 8 }}
            />
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={[styles.borderContainer, {
                // height: Platform.OS==='android'?'100%':'95%',
                height: '100%',
                marginTop: Platform.OS === "android" ? 20 : 80,
            }]}>
                <TouchableOpacity style={styles.backButton} onPress={onCrossPress}>
                    <Image
                        source={Icons.crossIcon}
                        style={styles.backButtonStyle}
                    />
                </TouchableOpacity>
                <View style={{width:'100%',}}>
                    <FlatList
                        renderItem={renderItem}
                        data={DATA}
                        contentContainerStyle={{ width: '100%', alignItems: 'center' }}
                        numColumns={2}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>

    )
}

export default ProfileCardModal;

const styles = StyleSheet.create({
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
        width: '100%',
        height: '100%',
        marginTop: 'auto',
        alignItems: 'center',
        backgroundColor: newColors.appBackground,
    },
    backButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    backButtonStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: newColors.appWhite
    },
})