import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        paddingTop:15,
        alignItems: 'center',
        backgroundColor: newColors.popupBg
    },
    postIconContainer: {
        padding: 10,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: newColors.appButtonDarkBg,
        marginLeft: 'auto',
        marginRight: 15,
        borderStyle: 'dotted', 
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    roundContainer: {
        width: '90%',
        padding: 10,
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    leftLineContainer: {
        width: '10%',
        height: 5,
    },
    infoCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        padding: 15,
        borderWidth: 2,
        borderColor: newColors.appButtonDarkBg,
        backgroundColor: newColors.appSimpleButtonBg
    },
    detailContainer: {
        width: 'auto',
        flexDirection: 'column',
        marginLeft: 10
    },
    bottomContiner: {
        width: '100%',
        height:'62%',
        marginTop:'auto',
        backgroundColor: newColors.appBackground,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 21.6,
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold
    },
    subheadingText: {
        fontSize: 14,
        fontWeight: '300',
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        color: newColors.appWhite
    },
    dateText: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 20,
        fontFamily: fonts.PoppinsMedium,
        color: newColors.appWhite
    },
    tickRoundContainer: {
        width: 24,
        height: 24,
        borderRadius: 100,
        borderWidth: 1,
        backgroundColor: newColors.appWhite,
        position: 'absolute',
        right: 15,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    switchContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        paddingHorizontal: 10
    },
    windRoundContainer: {
        width: 40,
        height: 40,
        backgroundColor: newColors.popupBg,
        borderRadius: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
        alignItems: 'center',
        justifyContent: 'center'
    },
    commentsHeading: {
        fontSize: 16,
        color: newColors.appWhite,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
        marginBottom:15
    },
    commentRenderContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        marginVertical: 10
    },
    commentDetailContainer: {
        marginLeft: 15,
        flexDirection: 'column',
    },
    commentNameText: {
        fontSize: 15,
        color: newColors.chatCardGrayText,
        fontWeight: '500',
        fontFamily: fonts.PoppinsRegular,
        marginBottom: 15
    },
    commentDateText: {
        fontSize: 12,
        color: newColors.grayText,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium
    },
    commentText: {
        color: newColors.appWhite,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: fonts.PoppinsRegular
    }
})

export default styles;