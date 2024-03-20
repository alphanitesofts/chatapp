import { StyleSheet, Platform } from "react-native";
import colors from "../../utils/colors";
import theme from "../../theme";

export const getVerificationStyle = (appTheme) => {
    return StyleSheet.create({
        mainContainer: {
            flex: 1,
            backgroundColor: appTheme === "light" ? theme.light.backgroundColor : theme.dark.backgroundColor,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 15
        },
        boxContainer: {
            width: '90%',
            paddingHorizontal: 10,
            paddingVertical: 5,
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.darkBorderColor,
            borderRadius: 10,
            marginVertical: 15,
            // ...Platform.select({
            //   ios: {
            //     shadowOffset: {
            //       width: 0,
            //       height: 2,
            //     },
            //     shadowOpacity: 0.30,
            //     shadowRadius: 3.84,
            //   },
            //   android: {
            //     elevation: 5,
            //   },
            // }),
          },
        anotherCodeButton:{
            width:'60%',
            alignItems:'center',
            justifyContent:'center',
        }
    })
}