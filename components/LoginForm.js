import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";
import Url from "./Url";
export default LoginForm = ({ navigation }) => {
	const { width } = useWindowDimensions();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(" ");

	const Login = async () => {
		setError("");
		const formdata = new FormData();
		formdata.append("email", email);
		formdata.append("password", password);
		const req = await fetch(`${Url}/api/admin/login`, {
			method: "post",
			headers: {
				Accept: "application/json",
			},
			body: formdata,
		});
		const res = await req.json();
		if (res.access_token) {
			setEmail("");
			setPassword("");
			await AsyncStorage.setItem("token", res.access_token);
			navigation.navigate("Tab");
		} else {
			setError("invalid email or password ");
		}
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Login</Text>
			<TextInput
				onChangeText={(e) => setEmail(e)}
				style={[styles.txt, { width: width / 2 }]}
				placeholder="Email"
				value={email}
			/>
			<TextInput
				onChangeText={(e) => setPassword(e)}
				style={[styles.txt, { width: width / 2 }]}
				placeholder="Password"
				value={password}
			/>
			<Text style={styles.error}>{error}</Text>
			<TouchableOpacity style={styles.btn} onPress={() => Login()}>
				<Text style={styles.btnTxt}>Login</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: "center",
	},
	title: {
		marginVertical: "10%",
		fontSize: 40,
	},
	btn: {
		backgroundColor: "#f92b48",
		padding: "2%",
		borderRadius: 10,
		width: "20%",
	},
	btnTxt: {
		color: "white",
		textAlign: "center",
	},
	innerView: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
	txt: {
		marginVertical: "3%",
		borderBottomWidth: 1,
		padding: "1%",
	},
	error: {
		marginVertical: "1%",
		color: "red",
	},
});
