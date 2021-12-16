import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Tab from "./TabNav";
import Startup from "../screens/Startup";

const Stack = createStackNavigator();

export default function StackNav({ initialRoute = "Startup" }) {
	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName={initialRoute}
				screenOptions={{ headerShown: false, gestureEnabled: false }}
			>
				<Stack.Screen name="Startup" component={Startup} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Tab" component={Tab} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
