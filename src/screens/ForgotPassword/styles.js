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
        marginBottom:20
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
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
        padding: 20,
        backgroundColor: newColors.popupBg,
        borderRadius: 12.84,
    },
})

export default styles
