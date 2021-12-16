import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Keyboard,
	Image,
	useWindowDimensions,
} from "react-native";
import LoginForm from "../components/LoginForm";
import bg from "../assets/Basma.png";

export default Login = ({ navigation }) => {
	const { width } = useWindowDimensions();
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Image source={bg} style={[styles.img, { width }]} />
				<LoginForm navigation={navigation} />
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	img: {
		flex: 1,
		resizeMode: "contain",
	},
});
