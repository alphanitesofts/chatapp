import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Images from '../../assets/images';
import AppButton from '../../components/AppButton';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import ImageComponent from '../../components/ImageComponent';

const NetworkCard = ({
    mainContainer,
    firstButtonTitle,
    onFirstButtonPress,
    secondButtonTitle,
    onSecondButtonPress,

    source,
    firstKeyToRender,
    secondKeyToRender,
    thirdKeyToRender
}) => {

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <ImageComponent
                source={source}
                mainStyle={{
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    marginTop: 10
                }}
                alternate={Images.placeholder}
            />
            <View style={styles.detailContainer}>
                {firstKeyToRender && <Text style={styles.titleText}>{firstKeyToRender&&firstKeyToRender?.substring(0, 10)?.concat("...")}</Text>}
                {secondKeyToRender && <Text style={styles.designationText}>{secondKeyToRender}</Text>}
                {thirdKeyToRender && <Text style={styles.dateText}>{thirdKeyToRender}</Text>}
            </View>

            {onFirstButtonPress && <AppButton
                title={firstButtonTitle}
                mainContainer={{ height: 42 }}
                onPress={onFirstButtonPress}
            />}
            {onSecondButtonPress && <AppButton
                title={secondButtonTitle}
                mainContainer={{ height: 42, marginTop: 10 }}
                onPress={onSecondButtonPress}
            />}
        </View>
    )
}

export default NetworkCard;

const styles = StyleSheet.create({
    mainContainer: {
        width: 166,
        borderRadius: 27,
        paddingHorizontal: 15,
        alignItems: 'center',
        marginRight: 10,
        paddingBottom: 15,
        backgroundColor: newColors.popupBg
    },
    detailContainer: {
        flexDirection: 'column',
        marginVertical: 10
    },
    titleText: {
        fontSize: 18,
        fontWeight: "600",
        textAlign: 'center',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appWhite
    },
    designationText: {
        fontSize: 10,
        fontWeight: '500',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appButtonDarkBg,
        textAlign: 'center',
        marginVertical: 10
    },
    dateText: {
        fontSize: 9,
        fontWeight: '700',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appWhite,
        textAlign: 'center'
    },
}) 