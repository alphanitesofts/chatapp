import { StyleSheet } from "react-native";
import newColors from "../../utils/newColors";
import fonts from "../../../assets";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        // padding: 15,
        backgroundColor: newColors.appBackground
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: '600',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold
    },
    headerStyle: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 15
    },
    emptContainer: {
        width: "100%",
        height: 500,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        color: newColors.appWhite,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    }
})

export default styles;