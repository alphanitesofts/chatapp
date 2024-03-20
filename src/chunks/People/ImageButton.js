import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import Images from '../../assets/images';
import { IMAGE_URL } from '../../api/config';
import ImageComponent from '../../components/ImageComponent';

const ImageButton = ({
    item,
    onPress,
    mainContainer,
}) => {

    return (
        <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={onPress}>
            <View style={styles.imageContainer}>
                <ImageComponent
                    source={(item?.image !== "null" && item?.image !== "default") ? `${IMAGE_URL}/${item?.image}` : Images.placeholder}
                    mainStyle={styles.imageSource}
                    alternate={Images.placeholder}
                />
            </View>
            <Text style={styles.titleText}>{item?.username && item?.username?.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}

export default ImageButton

const styles = StyleSheet.create({
    mainContainer: {
        width: 65,
        alignItems: 'center',
        marginRight: 5
    },
    imageContainer: {
        width: 62.35,
        height: 62.35,
        borderWidth: 3,
        borderRadius: 100,
        borderColor: newColors.appButtonDarkBg,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageSource: {
        width: 62.35,
        height: 62.35,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    titleText: {
        fontSize: 12.9,
        fontWeight: "500",
        fontFamily: fonts.PoppinsRegular,
        color: newColors.appWhite,
        marginVertical: 10,
        lineHeight: 15.48
    }
})