import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import theme from "../../theme";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor:newColors.appBackground
    },
    innerContainer:{
        flex:1,
        padding:15,
        justifyContent:'center',
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderColor: colors.darkBorderColor,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    plusVertical: {
        width: 12,
        height: 80,
        borderRadius: 5
    },
    plusHorizontal: {
        height: 12,
        width: 80,
        borderRadius: 5,
        position: 'absolute',
        zIndex: 1
    },
    absoluteContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    optionsContainer: {
        width: "70%",
        backgroundColor: colors.logoBlue,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    heading: {
        color: newColors.appWhite,
        fontWeight: '600',
        fontSize: 38,
        fontFamily: fonts.PoppinsRegular,
        lineHeight:47.5,
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop:20
    },
    triangleButtonContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:newColors.grayWhiteBg,
        borderRadius:15,
        marginTop:5
    },
    headingButtonStyle: {
        width: '30%',
        borderRadius: 5
    },
    skipButtonContainer:{
        borderWidth:1,
        borderRadius:12.84,
        padding:15,
        borderColor:newColors.appButtonDarkBg
    },
    skipButtonText:{
        fontSize:12,
        color:newColors.appInputText,
        fontFamily:fonts.PoppinsBold
    }
})

export default styles