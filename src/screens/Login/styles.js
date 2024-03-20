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
    innerContainer:{
        flex:1,
        padding:15,
        alignItems:'center',
        justifyContent:'center'
    },
    heading: {
        color: newColors.appWhite,
        fontWeight: '600',
        fontSize: 38,
        fontFamily: fonts.PoppinsRegular,
        lineHeight:47.5
    },
    forgotPasswordContainer:{
        padding:15,
    },
    forgotPasswordText:{
        fontSize:14,
        color:newColors.appInputText,
        fontFamily: fonts.PoppinsRegular,
        fontWeight:'500'
    },
    orText:{
        fontSize:14,
        fontWeight:'500',
        color:newColors.appInputText,
        textAlign:'center',
        marginVertical:20
    }
})

export default styles;


