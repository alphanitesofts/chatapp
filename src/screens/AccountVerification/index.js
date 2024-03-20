import React, { useState } from 'react';
import {
    SafeAreaView,
    TouchableOpacity,
    View
} from 'react-native';
import { getVerificationStyle } from './styles';
import AppButton from '../../components/AppButton';
import UploadImage from '../../components/UploadImage';
import colors from '../../utils/colors';
import GradientText from "react-native-gradient-texts";
import OTPInput from '../../components/OTPInput';
import { useSelector } from 'react-redux';
import theme from '../../theme';
import GradiantUploadImage from '../../components/GradiantUploadImage';
import AppGradiantButton from '../../components/AppGradiantButton';

const AccountVerification = ({ navigation }) => {

    const { appTheme } = useSelector(state => state.userSession)
    const styles = getVerificationStyle(appTheme)
    const [step, setStep] = useState(1)

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.boxContainer}>
                <AppButton
                    title={"Skip"}
                    titleAllCaps={true}
                    titleColor={{
                        color: appTheme === "light" ? theme.light.textColor : theme.dark.textColor
                    }}
                    mainContainer={{ borderWidth: 0, width: 'auto', marginLeft: 'auto' }}
                    onPress={() => setStep((value) => parseInt(value + 1))}
                />
                {step === 1 ? <>
                    {appTheme === "light" ? <GradiantUploadImage
                        mainContainer={{ width: 100, height: 100 }}
                        plusVertical={{ height: 50, width: 10 }}
                        plusHorizontal={{ width: 50, height: 10 }}
                    />
                        :
                        <UploadImage
                            mainContainer={{ width: 100, height: 100 }}
                            plusVertical={{ height: 50, width: 10 }}
                            plusHorizontal={{ width: 50, height: 10 }}
                        />}
                    <GradientText
                        text={"ACCOUNT VERIFICATION"}
                        fontSize={22}
                        isGradientFill
                        isGradientStroke
                        width={420}
                        locations={{ x: 210, y: 65 }}
                        gradientColors={[colors.logoPink, colors.logoBlue,]}
                        borderColors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                    />

                </>
                    :
                    <>
                        <OTPInput
                            appTheme={appTheme}
                            onComplete={(code) => {
                                console.log("code==>>", code)
                            }}
                        />
                        <TouchableOpacity style={styles.anotherCodeButton}
                            onPress={() => ""}
                        >
                            <GradientText
                                text={"ANOTHER CODE"}
                                fontSize={22}
                                isGradientFill
                                isGradientStroke
                                width={420}
                                locations={{ x: 210, y: 65 }}
                                gradientColors={[colors.logoPink, colors.logoBlue,]}
                                borderColors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                            />
                        </TouchableOpacity>
                    </>}
                {appTheme === "light" ? <AppGradiantButton
                    title={"Upload"}
                    titleAllCaps={true}
                    outerContainer={{ width: '50%', marginVertical: 20 }}
                    onPress={() => ""}
                /> :
                    <AppButton
                        title={"Upload"}
                        needGradiant={true}
                        titleAllCaps={true}
                        mainContainer={{ width: '50%', marginVertical: 20 }}
                        onPress={() => ""}
                    />}
            </View>

        </SafeAreaView>
    )
}

export default AccountVerification;