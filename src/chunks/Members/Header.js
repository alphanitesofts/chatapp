import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Icons from '../../assets/icons';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';
import BackButton from '../../components/BackButton';

const Header = ({
    navigation,
    title,
    onAddPress
}) => {


    return (
        <View style={styles.mainContainer}>
            <BackButton
                onPress={() => navigation.goBack()}
                mainContainer={styles.triangleButtonContainer}
            />
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                fontFamily: fonts.PoppinsBold,
                color: newColors.appWhite
            }}>{title?.toUpperCase()}</Text>
            <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
                <Image
                    source={Icons.PlusCircle}
                    style={{ width: 40, height: 40, resizeMode: 'contain', marginTop:5 }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15
    },
    triangleButtonContainer: {
        position: 'absolute',
        left: 15,
        top: 2
    },
    addButton: {
        position: 'absolute',
        zIndex: 10,
        right: 0,
        padding: 15,
    },
})