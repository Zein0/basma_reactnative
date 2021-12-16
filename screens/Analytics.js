import React, { useState, useEffect } from "react";
import {
	StyleSheet,
	View,
	useWindowDimensions,
	TouchableOpacity,
	Text,
	Animated,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Url from "../components/Url";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ item }) => (
	<View style={styles.item}>
		<Text style={styles.id}>{item.id}</Text>
		<Text style={styles.name}>{item.name}</Text>
		<Text style={styles.email}>{item.email}</Text>
	</View>
);
export default Analytics = ({ navigation }) => {
	const [option, setOption] = useState(0);
	const [users, setUsers] = useState([]);
	const [userLength, setUserLength] = useState(1);
	const { width } = useWindowDimensions();
	useEffect(async () => {
		if (option > 0) {
			const token = await AsyncStorage.getItem("token");
			const req = await fetch(`${Url}/api/admin/getNumberByOption/${option}`, {
				method: "get",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			const res = await req.json();

			if (res.status == true) {
				setUserLength(res.size);
				setUsers(
					res.users.map((user, key) => {
						return {
							id: user.id,
							index: key,
							name: user.first_name,
							email: user.email,
						};
					})
				);
			}
		}
	}, [option]);
	return (
		<View style={styles.container}>
			<View style={[styles.header, { width, height: width / 4 }]}>
				<Text style={styles.headText}>Analytics</Text>
				<TouchableOpacity>
					<MaterialIcons name="logout" size={20} color="white" />
				</TouchableOpacity>
			</View>
			<View style={styles.pagination}>
				<View style={styles.paginationOption}>
					<TouchableOpacity
						onPress={() => {
							setOption(1);
						}}
					>
						<MaterialIcons
							name={
								option == 1 ? "radio-button-checked" : "radio-button-unchecked"
							}
							size={15}
							color="black"
						/>
					</TouchableOpacity>

					<Text>24 hours</Text>
				</View>
				<View style={styles.paginationOption}>
					<TouchableOpacity
						onPress={() => {
							setOption(2);
						}}
					>
						<MaterialIcons
							name={
								option == 2 ? "radio-button-checked" : "radio-button-unchecked"
							}
							size={15}
							color="black"
						/>
					</TouchableOpacity>
					<Text>1 week</Text>
				</View>
				<View style={styles.paginationOption}>
					<TouchableOpacity
						onPress={() => {
							setOption(3);
						}}
					>
						<MaterialIcons
							name={
								option == 3 ? "radio-button-checked" : "radio-button-unchecked"
							}
							size={15}
							color="black"
						/>
					</TouchableOpacity>
					<Text>1 month</Text>
				</View>
				<View style={styles.paginationOption}>
					<TouchableOpacity
						onPress={() => {
							setOption(4);
						}}
					>
						<MaterialIcons
							name={
								option == 4 ? "radio-button-checked" : "radio-button-unchecked"
							}
							size={15}
							color="black"
						/>
					</TouchableOpacity>
					<Text>3 month</Text>
				</View>
				<View style={styles.paginationOption}>
					<TouchableOpacity
						onPress={() => {
							setOption(5);
						}}
					>
						<MaterialIcons
							name={
								option == 5 ? "radio-button-checked" : "radio-button-unchecked"
							}
							size={15}
							color="black"
						/>
					</TouchableOpacity>
					<Text>1 year</Text>
				</View>
			</View>

			{option > 0 && <Text style={styles.userlength}>{userLength} Users</Text>}
			{userLength > 0 && (
				<View style={styles.item}>
					<Text style={[styles.id, { fontWeight: "bold" }]}>Id</Text>
					<Text style={[styles.name, { fontWeight: "bold" }]}>Name</Text>
					<Text style={[styles.email, { fontWeight: "bold" }]}>Email</Text>
				</View>
			)}
			<Animated.FlatList
				style={{ width, height: "65%", marginBottom: "4%" }}
				data={users}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Item item={item} />}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	userlength: {
		textAlign: "center",
		justifyContent: "center",
		fontSize: 20,
	},
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	header: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		backgroundColor: "#f92b48",
		marginBottom: "2%",
		justifyContent: "flex-end",
		alignItems: "flex-end",
	},
	headText: {
		position: "absolute",
		fontSize: 22,
		left: "8%",
		bottom: "30%",
		color: "white",
	},
	pagination: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginVertical: "5%",
		flexWrap: "wrap",
	},
	paginationOption: {
		flexDirection: "row",
		alignItems: "center",
	},
	item: {
		flex: 1,
		flexDirection: "row",
		width: "90%",
		alignItems: "center",
		marginLeft: "5%",
		marginBottom: "2%",
	},
	name: {
		flex: 2.25,
		textAlign: "center",
		fontSize: 15,
	},
	id: {
		flex: 0.75,
		// borderWidth: 1,
	},
	email: {
		flex: 7,
		fontSize: 15,
		textAlign: "center",
		// borderWidth: 1,
	},
});
