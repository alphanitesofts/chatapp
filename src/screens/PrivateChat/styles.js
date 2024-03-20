import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import theme from "../../theme";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: newColors.appBackground,
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        color:newColors.appWhite,
        fontFamily:fonts.PoppinsBold
    },
    headerStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:15,
    },
    innerContainer:{
        width:'100%',
        alignItems:'center',
        padding:15
    }
})

export default styles