import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
    Text,
    FlatList
} from 'react-native';
import AppButton from '../../components/AppButton';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import AppInput from '../../components/AppInput';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import CrossButton from '../../components/CrossButton';

const DATA = [
    {
        id: "0",
        label: "John Doe"
    },
    {
        id: "1",
        label: "John Doe"
    },
    {
        id: "2",
        label: "John Doe"
    },
    {
        id: "3",
        label: "John Doe"
    },
    {
        id: "4",
        label: "John Doe"
    },
    {
        id: "5",
        label: "John Doe"
    },
    {
        id: "6",
        label: "John Doe"
    },
    {
        id: "7",
        label: "John Doe"
    },
    {
        id: "8",
        label: "John Doe"
    },
    {
        id: "9",
        label: "John Doe"
    },
]

const SearchChatModal = ({
    onCrossPress,
    onNextPress
}) => {

    const [members, setMemebers] = useState(DATA)

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.renderContainer}
                onPress={() => setMemebers(members?.map((e) => ({
                    ...e,
                    isSelected: e.id === item.id
                })))}
            >
                {item?.isSelected ? <View style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: newColors.appButtonDarkBg }}></View>
                    :
                    <Image
                        source={Images.sampleProfile}
                        style={styles.imageStyle}
                    />}
                <Text style={[styles.renderText, {
                    textDecorationLine: item?.isSelected ? 'line-through' : 'none'
                }]}>John Doe</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.borderContainer}>
                <View style={{width:'100%', flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Text style={styles.modalTitleText}>Search</Text>
                    <CrossButton
                        mainContainer={{
                            position:'absolute',
                            right:-10,
                            top:-8,
                            zIndex:10
                        }}
                        onPress={onCrossPress}
                    />
                </View>
                <AppInput
                    placeholder={"Search..."}
                    rightIcon={Icons.searchIcon}
                    rightIconStyle={{ tintColor: null }}
                />
                <FlatList
                    data={members}
                    renderItem={renderItem}
                    horizontal={true}
                    keyExtractor={(item, index) => index}
                    style={{ marginVertical: 15 }}
                />
                <AppButton
                    title={"Next"}
                    needGradiant={true}
                    titleAllCaps={true}
                    titleColor={{ letterSpacing: 10 }}
                    onPress={onNextPress}
                />
            </View>
        </View>

    )
}

export default SearchChatModal;

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
        backgroundColor: newColors.popupBg
    },
    modalTitleText: {
        fontSize: 22,
        color: newColors.appWhite,
        marginBottom: 15,
        fontFamily: fonts.PoppinsBold,
        fontWeight: '600'
    },
    renderContainer: {
        width: 66,
        marginHorizontal: 1,
        marginVertical: 15,
        alignSelf: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 100,
        borderWidth: 3,
        borderColor: newColors.appButtonDarkBg
    },
    renderText: {
        fontWeight: '500',
        marginTop: 10,
        fontSize: 12.9,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsRegular,
        lineHeight: 15.84
    }
})