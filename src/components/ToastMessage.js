import React, { useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setToastMessage } from "../redux/actions/actions";

const ToastMessage = () => {

    const { toastMessage } = useSelector(state => state.userSession)

    const dispatch = useDispatch()

    useEffect(() => {
        if (toastMessage) showToast(toastMessage?.type, toastMessage?.message)
        else return
    }, [toastMessage])

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: type === "error" && !text1 ? "Something went wrong please try again" : text1,
            text2: text2,
        });
        setTimeout(() => {
            dispatch(setToastMessage(null))
        }, 2000)
    }

    return (
        <View style={{
            width: '100%',
            position: 'absolute',
            top: 5,
            zIndex: 9999
        }}>
            <Toast />
        </View>
    )
}

export default ToastMessage;