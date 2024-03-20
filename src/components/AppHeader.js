import React, { useEffect, useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Images from '../assets/images';
import { useSelector } from 'react-redux';
import ImageComponent from './ImageComponent';
import { IMAGE_URL } from '../api/config';
import newColors from '../utils/newColors';
import fonts from '../../assets';
import Icons from '../assets/icons';

const AppHeader = ({
    title,
    titleAllCaps,
    onLeftIconPress,
    onRightIconPress,
    navigation,
    mainContainer
}) => {

    const { userDetails } = useSelector(state => state.userSession)

    const [profileImage, setProfileImage] = useState()

    useEffect(() => {
        setProfileImage(userDetails?.image)
    }, [userDetails])

    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <TouchableOpacity style={styles.imageButton}
                onPress={onLeftIconPress ? onLeftIconPress : () => {
                    navigation.navigate("Profile")
                }}
            ><ImageComponent
                    source={`${IMAGE_URL}/${profileImage}`}
                    mainStyle={styles.imageStyle}
                    alternate={Images.sampleProfile}
                />
            </TouchableOpacity>
            <Text style={styles.titleText}>{title && titleAllCaps ? title?.toUpperCase() : title}</Text>
            <TouchableOpacity style={styles.rightHeaderButton} onPress={onRightIconPress}>
                <Image
                    source={Icons.threeDotIcon}
                    style={{
                        width: 18,
                        height: 4,
                        resizeMode: 'contain'
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default AppHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '700',
        fontFamily: fonts.PoppinsRegular,
        color: newColors.appWhite,
    },
    imageButton: {
        width: 50,
        height: 50,
        borderRadius: 100,
        position: 'absolute',
        left: 15,
    },
    imageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 100
    },
    rightHeaderButton: {
        width: 50,
        height: 50,
        position: 'absolute',
        right: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gradiantDot: {
        width: 5,
        height: 5,
        borderRadius: 100
    },
    dotRowContainer: {
        width: '100%',
        marginTop: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    }
})