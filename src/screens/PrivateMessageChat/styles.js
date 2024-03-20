import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: newColors.popupBg,
        paddingTop:30
    },
    innerContainer: {
        width:'100%',
        height:'100%',
        paddingHorizontal:15,
        backgroundColor: newColors.appBackground,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop:40,
        paddingBottom: 40
    },
    inputRowContainer: {
        width: '100%',
        height:100,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: newColors.appBackground,
        justifyContent: 'space-between',
        marginBottom:  40
    },
    sendButtonContainer: {
        width: 61,
        height: 60,
        backgroundColor: newColors.blueBg,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12.84,
    },
    renderContainer: {
        width: '100%',
        flexDirection: 'column',
        padding: 5,
    },
    userContainer: {
        padding: 10,
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
        padding: 10,
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

export default styles