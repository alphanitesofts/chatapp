import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import BackButton from '../../components/BackButton';
import Images from '../../assets/images';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import ImageComponent from '../../components/ImageComponent';

const ChatScreenHeader = ({
    onBackPress,
    onImagePress,
    title,
    status,
    imageSource,
    disabledImgButton
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    return (
        <View style={styles.mainContainer}>
            <BackButton
                onPress={onBackPress}
                mainContainer={{ width: 30, height: 30, }}
            />
            <TouchableOpacity style={styles.leftRowContainer} disabled={disabledImgButton} onPress={onImagePress}>
                <ImageComponent
                    source={imageSource}
                    mainStyle={{
                        width: 48,
                        height: 48,
                        borderRadius: 100,
                        resizeMode: 'cover'
                    }}
                    alternate={Images.sampleProfile}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={styles.titleText}>{title && title?.substring(0, 5)?.concat("...")}</Text>
                    {/* <Text style={styles.statusText}>{status}</Text> */}
                </View>
            </TouchableOpacity>
            {/* <View style={styles.rightRowContainer}>
                <ImageButton
                    source={Icons.phoneIcon}
                    onPress={() => ""}
                />
                <ImageButton
                    source={Icons.videoCamIcon}
                    onPress={() => ""}
                    mainContainer={{ marginLeft: 10 }}
                />
            </View> */}
        </View >
    )
}

export default ChatScreenHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    leftRowContainer: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15
    },
    titleText: {
        fontSize: 24,
        color: newColors.appButtonDarkBg,
        fontWeight: '700',
        lineHeight: 32.69,
        fontFamily: fonts.PoppinsBold
    },
    statusText: {
        color: newColors.grayText,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: fonts.PoppinsMedium,
        lineHeight: 21
    },
    rightRowContainer: {
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto'
    }
})