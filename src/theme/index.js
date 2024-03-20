import colors from "../utils/colors";

const theme = {
    light: {
        backgroundColor: colors.appWhite,
        placeholder: colors.darkPlaceholder,
        textColor: colors.appBlack,
        loginInput: colors.loginInputLight,
        otpBorder: colors.lightOTPBorder,
        borderColor: colors.darkBorderColor
    },
    dark: {
        backgroundColor: colors.appBlack,
        placeholder: colors.appWhite,
        textColor: colors.appWhite,
        loginInput: colors.appDarkGray,
        otpBorder: colors.darkBorderColor,
        borderColor: colors.appWhite
    }
}

export default theme;