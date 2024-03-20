import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import { useSelector } from 'react-redux';
import Icons from '../../assets/icons';
import theme from '../../theme';
import colors from '../../utils/colors';
import TextArea from '../../components/TextArea';
import AppButton from '../../components/AppButton';

const StatusModal = ({
    onCrossPress,
    onPostPress
}) => {

    const { appTheme } = useSelector(state => state.userSession)
    const styles = getStatusModalStyles(appTheme)

    return (
        <View style={styles.mainContainer}>
            <View style={styles.rowContainer}>
                <TouchableOpacity style={styles.crossButton} onPress={onCrossPress}>
                    <Image
                        source={Icons.crossIcon}
                        style={styles.crossIconStyle}
                    />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>STATUS</Text>
            </View>
            <TextArea
                mainStyle={{marginTop:'45%', paddingHorizontal:20}}
                inputContainer={{minHeight:300, borderWidth:2}}
                placeholderColor={colors.appWhite}
                inputField={{ color:colors.appWhite, fontSize:16, fontWeight:'600'}}
            />
            <AppButton
                mainContainer={{
                    width:'40%',
                    marginTop:'60%'
                }}
                title={"post"}
                titleAllCaps={true}
                needGradiant={true}
                onPress={onPostPress}
            />
        </View>
    )
}

export default StatusModal;

const getStatusModalStyles = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            width: '100%',
            height: '110%',
            alignItems: 'center',
            position: 'absolute',
            zIndex: 50,
            backgroundColor: 'rgba(10, 10, 10, 0.9)'
        },
        crossButton: {
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            position:'absolute',
            left:15
        },
        crossIconStyle: {
            width: 12,
            height: 12,
            resizeMode: 'contain',
            tintColor: colors.appWhite
        },
        rowContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            position:'absolute',
            top:"15%",
            justifyContent:'center'
        },
        modalTitle: {
            fontSize: 24,
            color: colors.appWhite,
            textAlign:'center',
            fontWeight:"bold",
        },
    })
}