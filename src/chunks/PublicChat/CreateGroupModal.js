import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Text,
    Alert
} from 'react-native';
import Selector from './Selector';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import ModalButton from '../../components/ModalButton';
import Loader from '../../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { postGroup } from '../../api/methods/auth';
import { setToastMessage } from '../../redux/actions/actions';
import ToastMessage from '../../components/ToastMessage';
import newColors from '../../utils/newColors';
import NewUploadImage from '../../components/NewUploadImage';

const CreateGroupModal = ({
    appTheme,
    onCrossPress,
    onCreatePress
}) => {

    const { userId } = useSelector(state => state.userSession)

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState({})
    const [missingField, setMissingField] = useState("")

    useEffect(() => {
        if (details?.length > 0 && !details?.group_name) setMissingField("group_name")
        else if (details?.length > 0 && !details?.industry) setMissingField("industry")
        else setMissingField("")
    }, [details])

    const checkInput = () => {
        if (!details?.group_name) setMissingField("group_name")
        else if (!details?.industry) setMissingField("industry")
        else if (!details?.group_type) Alert.alert("Please select group type")
        else addGroup()
    }

    const addGroup = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("owner_id", userId)
            formData.append("group_name", details?.group_name)
            formData.append("group_image", details?.group_image)
            formData.append("industry", details?.industry)
            formData.append("group_members", userId)
            formData.append("group_type", details?.group_type)
            const response = await postGroup(formData)
            if (response?.data?.status === "200") {
                dispatch(setToastMessage({
                    type: "success",
                    message: response?.data?.message
                }))
                setTimeout(() => {
                    onCreatePress && onCreatePress()
                }, 1500)
            }
        } catch (error) {
            console.log("error==>>",error?.response?.data);
            dispatch(setToastMessage({
                type: "error",
                message: error?.response?.data?.data
            }))
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onCrossPress}>
                <Image
                    source={Icons.crossIcon}
                    style={styles.backButtonStyle}
                />
            </TouchableOpacity>
            <View style={styles.borderContainer}>
                <NewUploadImage
                    onChange={(item) => setDetails({ ...details, "group_image": item })}
                />
                <TextInput
                    placeholder='GROUP NAME'
                    style={[styles.inputContainer, {
                        borderColor: missingField === "group_name" ? newColors.warningRed : newColors.darkBorderColor
                    }]}
                    placeholderTextColor={missingField === "group_name" ? newColors.warningRed : newColors.darkBorderColor}
                    value={details?.group_name}
                    onChangeText={(text) => setDetails({ ...details, "group_name": text })}
                />
                {missingField === "group_name" && <Text style={styles.warningMessageText}>{"Please enter group name"}</Text>}
                <TextInput
                    placeholder='Industry'
                    style={[styles.inputContainer, { borderColor: missingField === "industry" ? newColors.warningRed : newColors.darkBorderColor, marginBottom: missingField === "industry" ? 0 : 20 }]}
                    placeholderTextColor={missingField === "industry" ? newColors.warningRed : newColors.darkBorderColor}
                    value={details?.industry}
                    onChangeText={(text) => setDetails({ ...details, "industry": text })}
                />
                {missingField === "industry" && <Text style={[styles.warningMessageText, { marginBottom: 20 }]}>{"Please enter group name"}</Text>}
                <Selector
                    items={[
                        { id: "1", label: "Public", },
                        { id: "2", label: "Private" },
                    ]}
                    keyToRender={"label"}
                    keyToCompare={"label"}
                    defaultValue={details?.group_type}
                    onChange={(item) => setDetails({ ...details, "group_type": item?.label })}
                />
            </View>
            <ModalButton
                title={"Create"}
                titleAllCaps={true}
                onPress={() => checkInput()}
            />
            <Loader
                loading={loading}
                isShowIndicator={true}
            />
            <ToastMessage />
        </View>
    )
}

export default CreateGroupModal;

const styles = StyleSheet.create({
    mainContainer: {
        width: '100%',
        height: '110%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        zIndex: 50,
        backgroundColor: newColors.popupBg
    },
    borderContainer: {
        width: '80%',
        padding: 20,
        borderWidth: 3,
        borderColor: newColors.appButtonDarkBg,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%',
    },
    inputContainer: {
        borderBottomWidth: 1,
        padding: 5,
        marginTop: 10,
        color: colors.appWhite,
        fontWeight: '500',
        fontSize: 15
    },
    backButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:'auto'
    },
    backButtonStyle: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: colors.appWhite
    },
    warningMessageText: {
        color: colors.warningRed,
        textAlign: 'center',
        fontSize: 13,
        fontWeight: "600",
        marginTop: 5
    },
})