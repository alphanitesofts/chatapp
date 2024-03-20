import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: newColors.appBackground,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headingText:{
        fontSize:38,
        fontWeight:'bold',
        fontFamily:fonts.PoppinsBold,
        color:newColors.appButtonDarkBg
    }
})

export default styles;