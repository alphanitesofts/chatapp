import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (key, value) => {
    try {
        if (key && value) {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        }
        else return
    } catch (error) {
        console.log("error==>", error);
    }
}

const getData = async (key) => {
    try {
        if (key) {
            const value = await AsyncStorage.getItem(key);
            return value
        } else return
    } catch (error) {
        console.log("get Data error==>", error);
    }
}

export {
    storeData,
    getData
}