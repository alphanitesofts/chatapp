import React, { useEffect, useRef, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../utils/colors';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';

const ChatMessage = ({
    data,
    scrollEnd,
    flatListRef
}) => {

    const ref = useRef(flatListRef)
    const { userId } = useSelector(state => state.userSession)

    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        if (data && data.length > 0) {
            setMessageList(data);
        }
        console.log("flatListRef==>>", flatListRef)

    }, [data, flatListRef]);

    const handleContentSizeChange = () => {
        console.log("data length==>>", data?.length)

        if (messageList?.length === data?.length) {
            console.log("called");
            ref.current.scrollToEnd({ animated: true })
        }
        else return
    };

    const renderItem = ({ item, index }) => {

        return (
            <View style={styles.renderContainer}>
                {item?.sender_id === `${userId}` ? <View style={styles.userContainer}>
                    <Text style={styles.userMessageText}>{item?.message}</Text>
                </View>
                    :
                    <View style={styles.otherUserContainer}>
                        <View style={styles.otherUserMessageContainer}>
                            <Text style={styles.otherUserMessageText}>{item?.message}</Text>
                        </View>
                    </View>}
            </View>
        )
    }

    return (
        <FlatList
            ref={ref}
            renderItem={renderItem}
            data={messageList}
            keyExtractor={(item, index) => index}
            showsVerticalScrollIndicator={false}
        />
    )
}

export default ChatMessage

const styles = StyleSheet.create({
    renderContainer: {
        width: '100%',
        flexDirection: 'column',
        padding: 15,
    },
    userContainer: {
        padding: 15,
        borderRadius: 12.84,
        backgroundColor: newColors.userMessageBg,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
    },
    userMessageText: {
        fontSize: 14,
        color: colors.appWhite,
        fontWeight: "400",
        lineHeight: 21,
        fontFamily: fonts.PoppinsMedium
    },
    otherUserContainer: {
        width: 'auto',
        flexDirection: "row",
        alignItems: 'center',
    },
    imageStyle: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
        borderRadius: 100
    },
    otherUserMessageContainer: {
        maxWidth: '85%',
        borderRadius: 12.84,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.otherMessageBg,
        shadowColor: newColors.otherMessageShadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 3.84,

        elevation: 5,
    },
    otherUserMessageText: {
        fontSize: 14,
        fontWeight: "400",
        lineHeight: 21,
        fontFamily: fonts.PoppinsMedium,
        color: newColors.otherMessageText
    },
    loaderContainer: {
        width: '100%',
        marginRight: 'auto'
    },
})