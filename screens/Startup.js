import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef } from "react";
import {
	Image,
	StyleSheet,
	Animated,
	useWindowDimensions,
	Text,
} from "react-native";
import Logo from "../assets/Basma.png";
import Url from "../components/Url";

export default Startup = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const fade = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		Animated.timing(fade, {
			toValue: 1,
			duration: 5000,
			useNativeDriver: true,
		}).start();
		setTimeout(async () => {
			const token = await AsyncStorage.getItem("token");

			if (token) {
				const req = await fetch(`${Url}/api/admin/check`, {
					method: "get",
					headers: {
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				});
				const res = await req.json();
				console.log(res);
				if (res.status == true) {
					navigation.navigate("Tab");
				} else {
					navigation.navigate("Login");
				}
			} else {
				navigation.navigate("Login");
			}
		}, 3500);
	}, []);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					opacity: fade,
				},
			]}
		>
			<Image source={Logo} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
});
