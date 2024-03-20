import { StyleSheet } from "react-native";
import colors from "../../utils/colors";
import theme from "../../theme";
import newColors from "../../utils/newColors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 15,
        backgroundColor: newColors.appBackground,
    },
    borderContainer: {
        width: '50%',
        height: 5,
        borderBottomWidth: 0.5,
        marginVertical: 20,
    },
    renderContainer: {
        width: '100%',
        paddingHorizontal: 10,
        borderRadius:12.84,
        borderColor:newColors.grayWhiteBg
    },
    gradiantBorder: {
        height: 2,
        width: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    renderFirstRowContainer: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    renderText: {
        width: '90%',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 10,
        color: newColors.appWhite,
        letterSpacing: 5
    },
    renderSecondRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    nameText: {
        fontSize: 14,
        color: newColors.appWhite,
    },
    dateText: {
        fontSize: 12,
        color: newColors.appWhite
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    groupImageContainer: {
        width: 100,
        height: 100,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    groupNameText: {
        fontSize: 24,
        fontWeight: '600',
        marginVertical: 15,
        color: newColors.appWhite,
        textAlign: 'center',
    },
    groupCountText: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.appGray
    },
    membersListCountText: {
        fontSize: 18,
        color: newColors.appWhite,
        fontWeight: 'bold',
        marginBottom: 25
    }
})

export default styles;