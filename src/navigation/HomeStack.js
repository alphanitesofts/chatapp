import { View, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icons from "../assets/icons";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import Search from "../screens/Search";
import PrivateChat from "../screens/PrivateChat";
import Members from "../screens/Members";
import Chat from "../screens/Chat";
import Contacts from "../screens/Contacts";
import newColors from "../utils/newColors";
import PrivateMessageChat from "../screens/PrivateMessageChat";
import OtherUserDetails from "../screens/OtherUserDetails";
import CreatePost from "../screens/CreatePost";

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const BottomStack = () => {

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: { height: 80, backgroundColor: newColors.appBackground, borderTopWidth:0.8, borderColor:newColors.darkBorderColor }
            }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? newColors.appButtonDarkBg : newColors.appInputText
                                    }}
                                    resizeMode='contain'
                                    source={Icons.homeIcon}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Search" component={Search}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? newColors.appButtonDarkBg : newColors.appInputText
                                    }}
                                    resizeMode='contain'
                                    source={Icons.globeIcon}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="PrivateChat" component={PrivateChat}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? newColors.appButtonDarkBg : newColors.appInputText
                                    }}
                                    resizeMode='contain'
                                    source={Icons.chatIcon}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Contacts" component={Contacts}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? newColors.appButtonDarkBg : newColors.appInputText
                                    }}
                                    resizeMode='contain'
                                    source={Icons.contactIcon}
                                />
                            </View>
                        )
                    }
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            <View style={{
                                width: "auto",
                                alignItems: "center",
                            }}>
                                <Image
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: focused ? newColors.appButtonDarkBg : newColors.appInputText
                                    }}
                                    resizeMode='contain'
                                    source={Icons.userIcon}
                                />
                            </View>
                        )
                    }
                }}
            />
        </Tab.Navigator>
    )
}

const HomeStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName="BottomStack"
        >
            <Stack.Screen name="BottomStack" component={BottomStack} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Members" component={Members} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="PrivateMessageChat" component={PrivateMessageChat} />
            <Stack.Screen name="OtherUserDetails" component={OtherUserDetails} />
            <Stack.Screen name="CreatePost" component={CreatePost} />
        </Stack.Navigator>
    )
}

export default HomeStack;