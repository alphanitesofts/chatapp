import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import theme from "../../theme";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: newColors.appBackground,
    },
    headerRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    innerContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    heading: {
        color: newColors.appWhite,
        fontWeight: '600',
        fontSize: 38,
        fontFamily: fonts.PoppinsRegular,
        lineHeight: 47.5,
        marginBottom: 20
    },
    rowContainer: {
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    forgotPassword: {
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotText: {
        fontSize: 15,
        fontWeight: '600',
        textDecorationLine: 'underline'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: newColors.popupBg,
        borderRadius: 12.84,
        marginVertical: 15,
        padding:15
    },
    verifyText: {
        fontSize: 22,
        color: newColors.appWhite,
        fontWeight: '600',
        fontFamily: fonts.PoppinsRegular
    },
    messageText: {
        fontSize: 14,
        fontWeight: '400',
        color: newColors.grayText,
        marginTop:10,
        fontFamily: fonts.PoppinsRegular
    },
    emailText:{
        fontSize:15,
        fontFamily: fonts.PoppinsRegular,
        marginTop:20,
        color:newColors.grayText,
        fontWeight:'600'
    }
})

export default styles;
