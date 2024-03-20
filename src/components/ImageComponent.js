import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Loader from './Loader';
import Images from '../assets/images';
import colors from '../utils/colors';

const ImageComponent = ({
    source,
    mainStyle,
    alternate,
    nameAlternateText,
    isFocused
}) => {
    const [src, setSrc] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if ((isFocused || !isFocused) && source) {
            checkURL(source);
        }
    }, [source, isFocused]);


    const checkURL = async (url) => {
        if (!url) {
            setSrc(alternate);
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(url);
            if (response.ok) {
                setSrc({ uri: url });
            } else {
                setSrc(alternate);
            }
        } catch (error) {
            setSrc(alternate);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={{ width: "auto", height: "auto", justifyContent: "center", alignItems: "center" }}>
            {src === Images.sampleProfile && nameAlternateText ? <View style={styles.altContainer}>
                <Text style={styles.altText}>{`${nameAlternateText}`}</Text>
            </View>
                :
                <Image
                    source={src}
                    style={[styles.imageStyle, mainStyle]}
                    alt='image not available'
                />}
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default ImageComponent;

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        alignSelf: "center",
    },
    altContainer: {
        width: "auto",
        height: "auto",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6c757d"
    },
    altText: {
        fontSize: 12,
        color: colors.white,
        flexWrap: "wrap",
        textAlign: "center",
        fontWeight: "600",
        width: 100
    }
})