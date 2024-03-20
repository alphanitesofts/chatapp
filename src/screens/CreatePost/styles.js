import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: newColors.appBackground
    },
    topRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 25,
        borderBottomWidth: 0.5,
        borderColor: newColors.grayText
    },
    backButtonContainer: {
        position: 'absolute',
        zIndex: 1,
        left: 5,
        top: 1,
        padding: 15,
    },
    postHeadingText: {
        fontSize: 16,
        color: newColors.appWhite,
        fontWeight: '600',
        fontFamily: fonts.PoppinsBold
    },
    publishButtonContainer: {
        position: 'absolute',
        right: 5,
        top: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    publishText: {
        color: newColors.appButtonDarkBg,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fonts.PoppinsBold
    },
    postContainer: {
        width: '100%',
        padding: 15,
    },
    userDetailRowContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems:'center',
    },
    userNameText: {
        fontSize: 16,
        color: newColors.appWhite,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium,
    },
    userEmailText:{
        color:newColors.grayText,
        fontSize:12,
        fontWeight:'500',
        fontFamily:fonts.PoppinsRegular
    },
    bottomRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-end",
        marginVertical: 25,
        padding: 15,
    },
    iconButtonContainer: {
        padding: 15,
        borderColor: newColors.appButtonDarkBg
    },
})

export default styles;