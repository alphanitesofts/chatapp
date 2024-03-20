import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import AppButton from '../../components/AppButton';
import newColors from '../../utils/newColors';
import Icons from '../../assets/icons';

const ConfirmModal = ({
    onCrossPress,
    onConfirmPress
}) => {


    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <TouchableOpacity style={styles.crossButtonContainer} onPress={onCrossPress}>
                    <Image
                        source={Icons.crossIcon}
                        style={styles.crossButtonIcon}
                    />
                </TouchableOpacity>
                <Text style={styles.confirmHeadingText}>ARE YOU SURE</Text>
                <AppButton
                    title={"Confirm"}
                    needGradiant={true}
                    mainContainer={{ width: '80%', }}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onConfirmPress}
                />
            </View>
        </View>

    )
}

export default ConfirmModal;

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
        width: '80%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.popupBg,
    },
    confirmHeadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: newColors.appWhite,
        marginTop: 20,
        marginBottom: 50
    },
    crossButtonContainer: {
        padding:10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    crossButtonIcon: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: newColors.appWhite
    },
})