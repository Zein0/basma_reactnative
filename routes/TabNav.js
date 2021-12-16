import React from "react";
import { View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Analytics from "../screens/Analytics";

const Tab = createMaterialBottomTabNavigator();

export default function TabNav() {
	return (
		<Tab.Navigator
			barStyle={{
				backgroundColor: "#f92b48",
			}}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarIcon: ({ color }) => (
						<View>
							<MaterialCommunityIcons name="home" color={color} size={26} />
						</View>
					),
				}}
			/>
			<Tab.Screen
				name="Analytics"
				component={Analytics}
				options={{
					tabBarIcon: ({ color }) => (
						<View>
							<Ionicons name="stats-chart" size={26} color={color} />
						</View>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
