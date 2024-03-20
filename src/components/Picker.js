import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    Modal,
    Pressable,
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';
import AppInput from './AppInput';
import { useSelector } from 'react-redux';
import theme from '../theme';
import Loader from './Loader';
import newColors from '../utils/newColors';

const Picker = ({
    mainStyle,
    title,
    items,
    defaultValue,
    onChange,
    titleAllCaps,
    showMandatoryStar,
    keyToRender,
    onSearch,
    isMandatory,
    disabled,
    placeholderTextColor,
    keyText,
    tintColor,
    placeholder,
    secondaryTitle,
    count,
    keyToCompare,
    onPickerOpen,
    pickerLoading
}) => {

    const { appTheme } = useSelector(state => state.userSession)

    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        defaultValue ? items?.forEach((element) => {
            if (defaultValue === element[keyToCompare]) {
                setSelected(element[keyToRender])
            }
        }) : setSelected("")
        setResults(items)
    }, [defaultValue, items])

    useEffect(() => {
        if (show) onPickerOpen && onPickerOpen()
    }, [show])

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={[styles.titleStyle, {
                color: isMandatory ? colors.warningRed : appTheme === "light" ? theme.light.textColor : theme.dark.textColor
            }]}>{titleAllCaps ? title?.toUpperCase() : title}<Text style={{ color: colors.warningRed }}>{showMandatoryStar ? "*" : ""}</Text></Text>}
            <TouchableOpacity
                disabled={disabled}
                style={[styles.innerContainer, {
                }]} onPress={() => setShow(!show)}>
                <Text style={[{
                    color: isMandatory ? colors.warningRed : newColors.appInputText,
                    fontSize: 15,
                    marginLeft:15,
                }, placeholderTextColor]}>{selected ? selected : placeholder ? placeholder?.toUpperCase() : "Please select"}</Text>
                <Image
                    source={Icons.arrowIcon}
                    style={[styles.iconContainer, {
                        tintColor: newColors.appInputText,
                        transform: [{ rotate: show ? "0deg" : "180deg" }]
                    }]}
                />
            </TouchableOpacity>
            {
                show &&
                <Modal
                    transparent={true}
                >
                    <Pressable style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "rgba(10, 10, 10,0.9)"
                    }} onPress={() => setShow(false)}>
                        <View style={[styles.dropDownContainer, {
                            borderColor: isMandatory ? colors.warningRed : colors.borderColor,
                        }]}>
                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 5,
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    fontWeight: "bold",
                                    color: colors.appWhite,
                                    textAlign: "left",
                                    marginLeft: 10,
                                    width: "60%"
                                }}>{(title?.includes("Select") || secondaryTitle?.includes("Select")) ? `${title || secondaryTitle}` : `Select ${title || secondaryTitle}`}</Text>
                                <TouchableOpacity style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: "flex-end",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: -10,
                                }} onPress={() => setShow(false)}>
                                    <Image
                                        source={Icons.simpleCrossIcon}
                                        style={{
                                            width: 10,
                                            height: 15,
                                            resizeMode: "contain",
                                            tintColor: colors.appBlack
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {onSearch && <AppInput
                                placeholder={"Search here"}
                                mainStyle={{ width: "95%", alignSelf: "center" }}
                                onChange={(text) => onSearch && onSearch(text)}
                            />}
                            <FlatList
                                data={results}
                                renderItem={({ item }) => {
                                    if(pickerLoading) return
                                    else{
                                        return (
                                            <TouchableOpacity style={styles.renderContainer} onPress={() => {
                                                setSelected(item[keyToRender])
                                                onChange && onChange(item)
                                                setShow(false)
                                            }}>
                                                <Text style={[styles.itemsText, keyText]}>{keyToRender ? `${item[keyToRender]}` : ""} <Text>{count ? `(${item[count]})` : null}</Text></Text>
                                            </TouchableOpacity>
                                        )

                                    }
                                }}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{
                                            width: "100%",
                                            height: "100%",
                                            justifyContent: "center",
                                            // marginTop: 50
                                        }}>
                                            <Text style={styles.listEmptyComponentText}>No Results Found</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </Pressable>
                    <Loader
                        loading={pickerLoading}
                        isShowIndicator={true}
                    />
                </Modal>
            }
        </View >
    )
}

export default Picker

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        flexDirection: "column",
    },
    titleStyle: {
        fontSize: 15,
        marginBottom: 10,
    },
    innerContainer: {
        width: "100%",
        height: 65.52,
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: "row",
        borderRadius: 12.84,
        backgroundColor:newColors.appInputBg
    },
    iconContainer: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginLeft: "auto",
        tintColor: colors.white
    },
    dropDownContainer: {
        width: "90%",
        minHeight: 100,
        maxHeight: 300,
        borderRadius: 12.84,
        marginTop: 10,
        paddingVertical: 10,
        alignSelf: "center",
        marginLeft: 5,
        zIndex: 1,
        backgroundColor: newColors.popupBg
    },
    renderContainer: {
        width: "95%",
        flexDirection: "column",
        alignSelf: "center",
        borderBottomWidth: 0.5,
        borderColor: colors.appWhite,
        paddingVertical: 10,
    },
    itemsText: {
        color: colors.appWhite,
        paddingTop: 10,
        paddingLeft: 15,
        fontWeight:'600',
        fontSize:13
    },
    listEmptyComponentText: {
        fontSize: 12,
        color: colors.white,
        textAlign: "center",
    }
})