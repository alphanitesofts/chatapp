import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.appBackground
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: '10%',
        padding: 20
    },
    headerRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    triangleButtonContainer: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:15,
        position:'absolute',
        top:0,
        left:15
    },
    headingText:{
        fontSize:20,
        color:newColors.appWhite,
        fontWeight:'500',
        textAlign:'center',
        fontFamily:fonts.PoppinsMedium
    },
    saveButtonContainer: {
        borderWidth: 1,
        borderRadius: 12.84,
        padding: 15,
        borderColor: newColors.appButtonDarkBg
    },
    saveButtonText:{
        fontSize:12,
        color:newColors.appInputText,
        fontFamily:fonts.PoppinsBold
    },
    innerContainer:{
        width:'100%',
        padding:15,
        justifyContent:'center',
    },
    editInputContainer:{
        width:'100%',
        borderRadius:17,
        height:62,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:"space-between",
        backgroundColor:newColors.popupBg,
        marginVertical:5,
        paddingLeft:15
    },
    titleText:{
        fontSize:16,
        fontWeight:'500',
        fontFamily:fonts.PoppinsRegular,
        color:newColors.appWhite
    },
    arrowButtonContainer:{
        padding:15,
        alignItems:'center',
        justifyContent:"center"
    },
    modalMainContainer: {
        width: '100%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: 'rgba(10, 10, 10, 0.7)'
    },
    modalBorderContainer: {
        width: '95%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.popupBg,
    },
})

export default styles;

