import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import theme from '../../theme';
import AppButton from '../../components/AppButton';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import UploadImage from '../../components/UploadImage';
import newColors from '../../utils/newColors';
import CrossButton from '../../components/CrossButton';
import AppInput from '../../components/AppInput';

const NewChatModal = ({
    onCrossPress,
    onNexPress
}) => {


    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <CrossButton
                    mainContainer={{
                        marginLeft:'auto',
                    }}
                    onPress={onCrossPress}
                />
                <AppInput
                    placeholder={"Chat Name"}
                    mainContainer={{marginVertical:15}}
                    onChange={(text)=>""}
                />
                <AppButton
                    title={"Next"}
                    needGradiant={true}
                    titleAllCaps={true}
                    onPress={onNexPress}
                />
            </View>
        </View>

    )
}

export default NewChatModal;

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
    }
})