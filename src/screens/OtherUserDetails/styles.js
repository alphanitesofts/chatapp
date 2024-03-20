import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: newColors.popupBg
    },
    innerContainer:{
        width:'100%',
    },
    topRowContainer:{
        width:'100%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        paddingTop:15,
        paddingBottom:25
    },
    backButtonContainer:{
        position:'absolute',
        zIndex:1,
        left:15,
    },
    topHeadingText:{
        fontSize:15,
        color:newColors.appWhite,
        textAlign:'center',
        fontWeight:'600',
        fontFamily:fonts.PoppinsBold
    },
    imageContainer:{
        borderWidth:3,
        borderColor:newColors.appButtonDarkBg,
        borderRadius:100,
        marginTop:30
    },
    emailText:{
        fontSize:16,
        color:newColors.appWhite,
        fontWeight:'500',
        lineHeight:19.2,
        textAlign:'center',
        marginVertical:15,
        fontFamily:fonts.PoppinsBold
    },
    bottomContiner: {
        width: '100%',
        height:'100%',
        backgroundColor: newColors.appBackground,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingTop: 50,
        paddingHorizontal: 15,
    },
    commentsHeading: {
        fontSize: 16,
        color: newColors.appWhite,
        fontWeight: '600',
        fontFamily: fonts.PoppinsMedium
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
    },
    postButtonContainer: {
        position: 'absolute',
        right: 5,
        top: 2,
        padding: 10,
        alignItems: 'center',
        justifyContent: "center"
    },
    postText: {
        color: newColors.appButtonDarkBg,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fonts.PoppinsBold
    },
})

export default styles;