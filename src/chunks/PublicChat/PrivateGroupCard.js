import React from 'react';
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

const PrivateGroupCard = ({
    appTheme,
    items,
    onPress
}) => {

    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={[styles.mainContainer, {
                borderColor: appTheme === "light" ? theme.light.borderColor : theme.dark.borderColor
            }]} onPress={() => onPress && onPress(items)}>
                <Image
                    source={Images.globeImage}
                    style={styles.imageStyle}
                />
                <View style={styles.detailContainer}>
                    <Text style={[styles.groupTitle, {
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }]}>{item?.group_name || "--"}</Text>
                    <Text style={[styles.industryText, {
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }]}>{item?.industry || "--"}</Text>
                    <Text style={[styles.memberText, {
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }]}>{`Members: ${item?.group_members_count || "--"}`}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={[styles.dollarText, {
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }]}>$</Text>
                    <Text style={[styles.dateText, {
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }]}>{item?.Idate || "--"}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
        />
    )
}

export default PrivateGroupCard

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    imageStyle: {
        width: 60,
        height: 60,
        resizeMode: 'cover',
        borderRadius: 100
    },
    detailContainer: {
        width: 'auto',
        flexDirection: 'column',
        marginHorizontal: 10
    },
    groupTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    industryText: {
        fontWeight: '500',
        marginVertical: 10
    },
    memberText: {
        fontSize: 12,
        fontWeight: '600'
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
    }
})