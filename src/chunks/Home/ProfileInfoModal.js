import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import { IMAGE_URL } from '../../api/config';
import ImageComponent from '../../components/ImageComponent';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import AppGrayButton from '../../components/AppGrayButton';
import Carousel from 'react-native-snap-carousel';

const ActionButton = ({
    icon,
    onPress,
    mainContainer,
    iconStyle
}) => {
    return (
        <TouchableOpacity style={[styles.actionButtonContainer, mainContainer]} onPress={onPress}>
            <Image
                source={icon}
                style={[styles.actionIcon, iconStyle]}
            />
        </TouchableOpacity>
    )
}

const ProfileInfoModal = ({
    onClosePress,
    details,
    navigation,
    data,
}) => {

    const carouselRef = useRef(null);
    const [disableScroll, setDisableScroll] = useState(false);
    const [initialIndexSet, setInitialIndexSet] = useState(false);

    useEffect(() => {
        if (!carouselRef.current || !details || !data || initialIndexSet) return;
        const index = data.findIndex(item => item.id === details.id);
        if (index !== -1) {
            setTimeout(() => { // Delay to ensure that the Carousel has rendered its items
                carouselRef.current.snapToItem(index);
                setDisableScroll(index + 1 === data.length);
                setInitialIndexSet(true);
            }, 1500);
        }
    }, [details?.id, data, initialIndexSet]);


    return (
        <View style={styles.mainContainer}>
            {/* <View style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: '40%'
            }}>
                 <Carousel
                    ref={carouselRef}
                    data={data}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.borderContainer}>
                                <View style={{ width: '100%', alignItems: 'center', marginBottom: 15, }}>
                                    <ImageComponent
                                        source={`${IMAGE_URL}/${item?.image}`}
                                        alternate={Images.sampleProfile}
                                        mainStyle={{ borderRadius: 100 }}
                                    />
                                    <Text style={styles.requstNameText}>{item?.username || "--"}</Text>
                                    <Text style={styles.positionText}>{item?.industry || "--"}</Text>
                                    <Text style={styles.dateText}>{item?.Idate || "--"}</Text>
                                    <View style={styles.rowContainer}>
                                        <ActionButton
                                            icon={Icons.messageIcon}
                                            onPress={() => {
                                                onClosePress && onClosePress()
                                                navigation.navigate("PrivateMessageChat", { chatDetails: item })
                                            }}
                                        />
                                        <ActionButton
                                            icon={Icons.userIcon}
                                            mainContainer={{ marginHorizontal: 15 }}
                                            onPress={() => {
                                                onClosePress && onClosePress()
                                                navigation.navigate("OtherUserDetails", { otherUserId: item?.id })
                                            }}
                                        />
                                        <ActionButton
                                            icon={Icons.questionMark}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                                </View>
                                <AppGrayButton
                                    title={"Close"}
                                    titleAllCaps={true}
                                    onPress={onClosePress}
                                />
                            </View>
                        )
                    }}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width}
                    onSnapToItem={(index) => {
                        setDisableScroll(index + 1 === data.length)
                    }}
                />
                <View style={styles.arrowRowContainer}>
                    <TouchableOpacity style={styles.arrowButtonContainer} onPress={() => carouselRef.current.snapToPrev()}>
                        <Image
                            source={Icons.swipeArrowLeftIcon}
                            style={{
                                width: 44,
                                height: 10
                            }}
                        />
                    </TouchableOpacity>
                    {!disableScroll && <TouchableOpacity style={[styles.arrowButtonContainer, {
                        marginLeft: 15
                    }]} onPress={() => carouselRef.current.snapToNext()}>
                        <Image
                            source={Icons.swipeArrowRightIcon}
                            style={{
                                width: 44,
                                height: 10
                            }}
                        />
                    </TouchableOpacity>}
                </View>
            </View> */}
            <View style={styles.borderContainer}>
                <View style={{ width: '100%', alignItems: 'center', marginBottom: 15 }}>
                    <ImageComponent
                        source={`${IMAGE_URL}/${details?.image}`}
                        alternate={Images.sampleProfile}
                        mainStyle={{ borderRadius: 100 }}
                    />
                    <Text style={styles.requstNameText}>{details?.username || "--"}</Text>
                    <Text style={styles.positionText}>{details?.industry || "--"}</Text>
                    <Text style={styles.dateText}>{details?.Idate || "--"}</Text>
                    <View style={styles.rowContainer}>
                        <ActionButton
                            icon={Icons.messageIcon}
                            onPress={() => {
                                onClosePress && onClosePress()
                                navigation.navigate("PrivateMessageChat", { chatDetails: details })
                            }}
                        />
                        <ActionButton
                            icon={Icons.userIcon}
                            mainContainer={{ marginHorizontal: 15 }}
                            onPress={() => {
                                onClosePress&&onClosePress()
                                navigation.navigate("OtherUserDetails", { otherUserId: details?.id })
                            }}
                        />
                        <ActionButton
                            icon={Icons.questionMark}
                        />
                    </View>
                </View>
                <View style={{ width: "100%", alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                </View>
                <AppGrayButton
                    title={"Close"}
                    titleAllCaps={true}
                    onPress={onClosePress}
                />
            </View>
        </View>

    )
}

export default ProfileInfoModal;

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
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.popupBg,
    },
    requstNameText: {
        fontSize: 28.91,
        color: newColors.appWhite,
        lineHeight: 34.69,
        fontWeight: '600',
        fontFamily: fonts.PoppinsBold,
        marginTop: 15
    },
    positionText: {
        fontSize: 16.06,
        fontWeight: '500',
        fontFamily: fonts.PoppinsBold,
        color: newColors.appButtonDarkBg,
        textAlign: 'center',
        lineHeight: 32.12
    },
    dateText: {
        fontSize: 14.45,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsItalic,
        fontWeight: '700',
        lineHeight: 32.12
    },
    rowContainer: {
        width: '100%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    actionButtonContainer: {
        width: 45,
        height: 45,
        backgroundColor: newColors.imageButtonBg,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionIcon: {
        width: 25,
        height: 25,
        resizeMode: "contain",
        tintColor: newColors.appWhite
    },
    arrowRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
        position: 'absolute',
        justifyContent: 'center',
        bottom: 150
    },
    arrowButtonContainer: {
        padding: 15,
        zIndex: 50
    }
})