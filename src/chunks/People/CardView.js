import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import newColors from '../../utils/newColors';
import Images from '../../assets/images';
import fonts from '../../../assets';
import Icons from '../../assets/icons';
import ImageComponent from '../../components/ImageComponent';
import { IMAGE_URL } from '../../api/config';

const CardView = ({
    item,
    onPress,
    onLikePress,
    onCommentPress,
    onSharePress,
    onSavePress
}) => {

    return (
        <View style={styles.mainContainer} onPress={onPress}>
            <View style={styles.rowContainer}>
                <ImageComponent
                    source={`${IMAGE_URL}/${item?.poster_id_image}`}
                    alternate={Images.sampleProfile}
                    mainStyle={styles.renderImageStyle}
                />
                <View style={styles.detailContainer}>
                    <Text style={styles.chatNameText}>{item?.poster_id_name || "--"}</Text>
                    <Text style={styles.dateText}>{item?.Idate || "--"}</Text>
                </View>
                <Image
                    source={Icons.verticalThreeDotsIcon}
                    style={{
                        width: 4.6,
                        height: 17.91,
                        marginLeft: 'auto',
                        marginTop: -20
                    }}
                />
            </View>
            <Text style={styles.descText}>{item?.message || "--"}</Text>
            {item?.image !== "NULL" && <ImageComponent
                source={`${IMAGE_URL}/${item?.image}`}
                alternate={Images.sampleProfile}
                mainStyle={styles.postImageStyle}
            />}
            <View style={styles.bottomRowContainer}>
                <TouchableOpacity style={styles.likeButtonContainer} onPress={onLikePress}>
                    <Image
                        source={Icons.likeheartIcon}
                        style={{
                            width: 20,
                            height: 17.89,
                            resizeMode: 'contain',
                            tintColor: item?.is_liked ? newColors.likeRed : newColors.appWhite
                        }}
                    />
                    <Text style={styles.likeCounterText}>{item?.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.likeButtonContainer} onPress={onCommentPress}>
                    <Image
                        source={Icons.commentIcon}
                        style={{
                            width: 20,
                            height: 17.89,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text style={styles.likeCounterText}>{item?.total_comments}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.likeButtonContainer}>
                    <Image
                        source={Icons.shareIcon}
                        style={{
                            width: 20,
                            height: 17.89,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity> */}
                <TouchableOpacity style={[styles.likeButtonContainer, { marginLeft: 'auto' }]}>
                    <Image
                        source={Icons.savePostIcon}
                        style={{
                            width: 20,
                            height: 17.89,
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CardView

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        maxHeightheight: 368,
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginBottom: 10,
        backgroundColor: newColors.appSimpleButtonBg,
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    renderImageStyle: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
        borderRadius: 100
    },
    detailContainer: {
        width: 'auto',
        paddingLeft: 15
    },
    chatNameText: {
        fontSize: 18,
        fontWeight: "600",
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold,
        lineHeight: 21.6
    },
    dateText: {
        fontWeight: "400",
        color: newColors.postDateText,
        fontSize: 14,
        lineHeight: 15,
        fontFamily: fonts.PoppinsRegular
    },
    descText: {
        color: newColors.appWhite,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
        marginVertical:15
    },
    bottomRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    likeButtonContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center'
    },
    likeCounterText: {
        fontSize: 14,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
        color: newColors.appWhite,
        marginLeft: 10
    },
    postImageStyle: {
        width: '100%',
        height: 180,
        resizeMode: "cover",
        borderRadius: 12.84,
        marginVertical: 15
    }
})