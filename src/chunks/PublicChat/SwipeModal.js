import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    FlatList,
    Dimensions
} from 'react-native';
import colors from '../../utils/colors';
import theme from '../../theme';
import Icons from '../../assets/icons';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';
import AppSwitch from '../../components/AppSwitch';
import Carousel from 'react-native-snap-carousel';
import AppButton from '../../components/AppButton';
import ModalButton from '../../components/ModalButton';
import newColors from '../../utils/newColors';
import AppGrayButton from '../../components/AppGrayButton';

const DATA = ["0", "1", "3", "4", "5"]

const SwipeModal = ({
    appTheme,
    onClosePress
}) => {
    const sliderWidth = Dimensions.get("window").width * 0.9;

    const carouselRef = useRef(null)
    const [disableScroll, setDisableScroll] = useState(false)

    const renderItem = ({ item }) => {
        return (
            <View style={styles.borderContainer}>
                <Image
                    source={Images.sampleProfile}
                    style={styles.imageStyle}
                />
                <Text style={styles.chatNameText}>Jake Retail</Text>
                <View style={styles.rowContainer}>
                    <Text style={styles.dateLocationText}>Mexico</Text>
                    <Text style={styles.dateLocationText}>07/01/2023</Text>
                </View>
                <View style={styles.avatarContainer}>
                    <Image
                        source={Images.sampleProfile}
                        style={{
                            width: 48,
                            height: 48,
                            resizeMode: 'cover',
                            borderRadius: 100
                        }}
                    />
                </View>
                <View style={styles.switchRowContainer}>
                    <AppSwitch
                        icon={Icons.muscleIcon}
                    />
                    <AppSwitch
                        icon={Icons.messageIcon}
                        tintColor={colors.appBlue}
                    />
                </View>
            </View>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={styles.triangleButtonContainer} onPress={() => carouselRef.current.snapToPrev()}>
                    <Image
                        source={Icons.triangleButton}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain',
                            tintColor: colors.red
                        }}
                    />
                </TouchableOpacity>
                <Carousel
                    ref={carouselRef}
                    data={DATA}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    sliderWidth={Dimensions.get("window").width}
                    itemWidth={Dimensions.get("window").width}
                    onSnapToItem={(index) => {
                        setDisableScroll(index + 1 === DATA.length)
                    }}
                />

                {!disableScroll && <TouchableOpacity style={styles.triangleButtonContainer} onPress={() => carouselRef.current.snapToNext()}>
                    <Image
                        source={Icons.triangleButton}
                        style={{
                            width: 40,
                            height: 40,
                            resizeMode: 'contain',
                            transform: [{ rotate: '180deg' }],
                            tintColor: colors.lighGreen
                        }}
                    />
                </TouchableOpacity>}
            </View>
            <AppButton
                title={"Close"}
                titleAllCaps={true}
                onPress={onClosePress}
                mainContainer={{ marginBottom: '20%', width: '90%' }}
            />
        </View>

    )
}

export default SwipeModal;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 50,
        // backgroundColor: 'rgba(10, 10, 10, 0.9)'
        backgroundColor: newColors.popupBg
    },
    borderContainer: {
        width: '74.5%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: newColors.appButtonDarkBg,
    },
    crossButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0
    },
    crossIconStyle: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
        tintColor: newColors.appWhite
    },
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: newColors.appButtonDarkBg,
    },
    groupNameText: {
        fontSize: 20,
        fontWeight: '500',
        color: newColors.appWhite,
        marginTop: 15
    },
    chatNameText: {
        fontSize: 20,
        marginTop: 15,
        fontWeight: "500",
        color: newColors.appWhite,
    },
    rowContainer: {
        width: '100%',
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    dateLocationText: {
        marginVertical: 15,
        color: newColors.appWhite,
    },
    avatarContainer: {
        width: 50,
        height: 50,
        borderColor: newColors.appWhite,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        marginVertical: 15
    },
    switchRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    triangleButtonContainer: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})