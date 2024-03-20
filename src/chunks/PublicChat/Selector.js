import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import newColors from '../../utils/newColors';
import fonts from '../../../assets';

const Selector = ({
    items,
    keyToRender,
    mainStyle,
    defaultValue,
    onChange,
    appTheme,
    keyToCompare
}) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        (defaultValue && items) ? setOptions(items.map((element) => ({ ...element, isSelected: element[keyToCompare] === defaultValue || element.id === defaultValue }))) : setOptions(items)
    }, [items])

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {
                options && options?.map((item, index) => {
                    return (
                        <TouchableOpacity style={[styles.selectorContainer, {
                            borderWidth: item?.isSelected ? 3 : 0
                        }]} key={index}
                            // disabled={item.isSelected}
                            onPress={() => {
                                setOptions(options?.map((e) => ({
                                    ...e,
                                    isSelected: e.id === item.id
                                })))
                                onChange && onChange(item)
                            }}
                        >
                            <Text
                                style={styles.keyText}
                            >{keyToRender ? item[keyToRender]?.toUpperCase() : ""}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View >
    )
}

export default Selector

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: newColors.popupBg,
        borderRadius: 15
    },
    selectorContainer: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        borderColor: newColors.appButtonDarkBg,
        borderRadius: 15,
        alignItems: 'center',
    },
    keyText: {
        fontSize: 14.71,
        fontWeight: '500',
        color: newColors.appWhite,
        fontFamily: fonts.PoppinsBold
    },
})