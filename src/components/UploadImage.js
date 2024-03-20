import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import AppButton from './AppButton';
import LinearGradient from 'react-native-linear-gradient';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import colors from '../utils/colors';
import Icons from '../assets/icons';
import { useIsFocused } from '@react-navigation/native';
import Images from '../assets/images';
import Loader from './Loader';
import newColors from '../utils/newColors';

const ImageButton = ({
    source,
    onPress
}) => {
    return (
        <TouchableOpacity style={{
            width: 60,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5
        }} onPress={onPress}>
            <Image
                source={source}
                style={{
                    width: 18,
                    height: 18,
                    resizeMode: 'contain',
                    tintColor: colors.appWhite
                }}
            />
        </TouchableOpacity>
    )
}

const UploadImage = ({
    onChange,
    mainContainer,
    plusVertical,
    plusHorizontal,
    disabled,
    source,
    alternate,
    isFocused
}) => {

    const options = {
        opacity: 0.3,
        mediaType: 'photo',
        videoQuality: 'low',
        quality: 0.1,
    }

    const [showModal, setShowModal] = useState(false)
    const [imgSource, setImgSource] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isFocused || !isFocused) {
            source && checkURL(source)
        }
    }, [source, isFocused])

    const checkURL = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url);
            if (response.ok) setImgSource({ uri: url })
        } catch (error) {
            // An error occurred during the fetch
            console.error(`Error checking URL:`, error);

        } finally { setLoading(false) }
    };

    const showCamera = () => {
        launchCamera(options, callback);
        // uri = null
    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
        // uri = null
    }

    const callback = async response => {
        setShowModal(false)
        if (response.didCancel) {
            // uri = userInfo?.profile_picture
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            onChange && onChange(source)
            setImgSource(source)
        }
    }

    return (
        <View style={styles.mainContainer}>
            {showModal ? <View style={styles.absoluteContainer}>
                <View style={styles.optionsContainer}>
                    <ImageButton
                        source={Icons.cameraIcon}
                        onPress={() => showCamera()}
                    />
                    <ImageButton
                        source={Icons.uploadIcon}
                        onPress={() => showLibrary()}
                    />
                    <ImageButton
                        source={Icons.crossIcon}
                        onPress={() => setShowModal(false)}
                    />
                </View>
            </View> : null}
            <TouchableOpacity style={[styles.imageContainer, mainContainer]}
                disabled={disabled}
                onPress={() => setShowModal(true)}>
                {imgSource ? <Image
                    source={imgSource}
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        borderRadius: 100
                    }}
                />
                    :
                    <>

                        <LinearGradient colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                            style={[styles.plusVertical, plusVertical]}>
                        </LinearGradient>
                        <LinearGradient colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                            style={[styles.plusHorizontal, plusHorizontal]}>
                        </LinearGradient>
                    </>}
            </TouchableOpacity>
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default UploadImage;

const styles = StyleSheet.create({
    mainContainer: {
        width: 'auto',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: colors.darkBorderColor,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusVertical: {
        width: 12,
        height: 80,
        borderRadius: 5
    },
    plusHorizontal: {
        height: 12,
        width: 80,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 1
    },
    absoluteContainer: {
        width: "90%",
        height: "90%",
        top: 8,
        position: "absolute",
        zIndex: 1,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
    },
    optionsContainer: {
        width: 150,
        height: 150,
        flexDirection: 'row',
        backgroundColor: colors.logoBlue,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20
    },
})