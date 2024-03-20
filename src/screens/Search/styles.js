import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems: 'center',
        backgroundColor: newColors.appBackground
    },
    innerContainer:{
        width:'100%',
        height:'100%',
        padding:15,
        alignItems:'center',
    },
    groupsHeading: {
        fontSize: 22,
        fontWeight:'600',
        textAlign: 'center',
        marginVertical: 10,
        color:newColors.appWhite,

    },
    shadowContainer: {
        width: '100%',
        // height:350,
        alignItems: 'center',
        marginTop:50,
        zIndex:20,
        // backgroundColor: 'rgba(10, 10, 10, 0.5)'
    },
})

export default styles;