import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../utils/colors';

const items = ["0", "1", "2", "3", "4", "5", "6"]

const GradiantDivider = ({
    title,
    mainContainer,
    appTheme,
    titleAllCaps
}) => {


    return (
        <View style={[styles.mainContainer, mainContainer]}>
            <View style={styles.rowContainer}>
                {items?.map((e, index) => {
                    return (
                        <LinearGradient
                            colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                            style={[styles.lineContainer, {
                                marginTop: index % 2 !== 0 ? 20 : 0
                            }]}
                            start={{ x: 0.0, y: 1.0 }} end={{ x: 1.0, y: 1.0 }}
                        >
                        </LinearGradient>
                    )
                })}

            </View>
            {title && <Text style={[styles.titleText, {
                color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor,
            }]}>{title && titleAllCaps ? title?.toUpperCase() : title}</Text>}
        </View>
    )
}

export default GradiantDivider

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        paddingHorizontal: 15,
    },
    titleText: {
        fontSize: 13,
        letterSpacing: 10,
        textAlign: 'center',
        marginVertical: 15
    },
    rowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    lineContainer: {
        flex: 1,
        height: 5,
        borderRadius: 10
    }
})