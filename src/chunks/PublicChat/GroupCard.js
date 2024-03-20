import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../../utils/colors';
import Images from '../../assets/images';
import theme from '../../theme';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import Icons from '../../assets/icons';

const GroupCard = ({
    appTheme,
    items,
    onPress,
    mainContainer,
    emptyListMessage
}) => {

    useEffect(() => {
        items && setList(items)
    }, [items])

    const [list, setList] = useState([])

    const renderItem = ({ item }) => {


        return (
            <TouchableOpacity style={[styles.mainContainer, mainContainer]} onPress={() => onPress && onPress(item)}>
                {item?.group_image ? <ImageComponent
                    source={`${IMAGE_URL}/${item?.group_image}`}
                    mainStyle={styles.imageStyle}
                /> :
                    <View style={[styles.imageStyle, { backgroundColor: newColors.cardBg }]}></View>}
                <View style={styles.detailContainer}>
                    <Text style={styles.groupTitle}>{item?.group_name || "--"}</Text>
                    <Text style={styles.industryText}>{item?.industry || "--"}</Text>
                    <Text style={styles.memberText}>{`Members: ${item?.group_members_count || "--"} - ${item?.Idat || "--"}`}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={list}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            ListEmptyComponent={() => {
                return (
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
                        <Image
                            source={Icons.peopleIcon}
                            style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                                tintColor: newColors.appWhite
                            }}
                        />
                        <Text style={{
                            color: newColors.appWhite,
                            marginVertical: 15,
                            fontSize: 18,
                            fontWeight: 'bold',
                            fontFamily: fonts.PoppinsBold
                        }}>{emptyListMessage}</Text>
                    </View>
                )
            }}
        />
    )
}

export default GroupCard

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 105,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 3,
        borderRadius: 27,
        marginBottom: 10,
        borderColor: newColors.appButtonDarkBg,
        backgroundColor: newColors.popupBg
    },
    imageStyle: {
        width: 82,
        height: 82,
        resizeMode: 'cover',
        borderRadius: 27
    },
    detailContainer: {
        width: 'auto',
        flexDirection: 'column',
        marginHorizontal: 10,
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 21.6,
        fontWeight: '600',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsRegular
    },
    industryText: {
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '300',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsRegular
    },
    memberText: {
        fontSize: 12,
        lineHeight: 20,
        fontWeight: '700',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsRegular
    },
    rightContainer: {
        flexDirection: 'column',
        marginLeft: 'auto',
    },
    dollarText: {
        fontSize: 16,
        fontWeight: 'bold',
        position: 'absolute',
        top: 0,
        right: 0
    },
    dateText: {
        fontSize: 14,
        fontWeight: 'bold',
        position: 'absolute',
        bottom: -5,
        right: 0
    },
    emptyContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})