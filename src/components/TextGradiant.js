import React from 'react';
import {
    Text,
} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';

const TextGradiant = (props) => {
    return (
        <MaskedView maskElement={<Text {...props} />}>
            <LinearGradient
                colors={[colors.logoPink, colors.appPurple, colors.logoBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
            >
                <Text {...props} style={[props.style, { opacity: 0, }]} />
            </LinearGradient>
        </MaskedView>
    )
}

export default TextGradiant;