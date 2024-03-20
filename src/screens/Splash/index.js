import React, { useEffect } from 'react';
import {
    Text,
    SafeAreaView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';
import { useSelector } from 'react-redux';

const Splash = ({ navigation }) => {

    const isFocused = useIsFocused()
    const { authenticationToken } = useSelector(state => state.userSession)

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                if (authenticationToken) navigation.navigate('HomeStack')
                else navigation.navigate('AuthStack')
            }, 3000)
        }
    }, [isFocused, authenticationToken])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <Text style={styles.headingText}>Chat APP</Text>
        </SafeAreaView>
    )
}

export default Splash;