import React, { useEffect, useRef, useState } from "react";
import {
	StyleSheet,
	View,
	useWindowDimensions,
	TouchableOpacity,
	Animated,
	Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Pagination, { Icon, Dot } from "react-native-pagination";
import Url from "../components/Url";
// import PaginationDot from "react-native-animated-pagination-dot";

const Item = ({ item }) => (
	<View style={styles.item}>
		<Text style={styles.id}>{item.id}</Text>
		<Text style={styles.name}>{item.name}</Text>
		<Text style={styles.email}>{item.email}</Text>
	</View>
);
export default Home = ({ navigation }) => {
	const [page, setPage] = useState(1);
	const [max, setMax] = useState(1);
	const [paginateOption, setPaginateOption] = useState(20);
	const [users, setUsers] = useState([]);

	useEffect(async () => {
		const token = await AsyncStorage.getItem("token");
		const req = await fetch(
			`${Url}/api/admin/getRegisteredPag/${paginateOption}?page=${page}`,
			{
				method: "get",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		const res = await req.json();
		console.log(res);
		if (res.status == true) {
			setUsers(
				res.users.data.map((user, key) => {
					return {
						id: user.id,
						index: key,
						name: user.first_name,
						email: user.email,
					};
				})
			);
			setMax(res.users.last_page);
		}
	}, [page, paginateOption]);
	const { width, height } = useWindowDimensions();
	return (
		<View style={styles.container}>
			<View style={[styles.header, { width, height: width / 4 }]}>
				<Text style={styles.headText}>Registered Users</Text>
				<TouchableOpacity
					onPress={() => {
						AsyncStorage.removeItem("token");
						navigation.navigate("Login");
					}}
				>
					<MaterialIcons name="logout" size={20} color="white" />
				</TouchableOpacity>
			</View>
			<View>
				<Text style={styles.title}>Users per Page</Text>
				<View style={styles.pagination}>
					<View style={styles.paginationOption}>
						<TouchableOpacity
							onPress={() => {
								setPaginateOption(20);
							}}
						>
							<MaterialIcons
								name={
									paginateOption == 20
										? "radio-button-checked"
										: "radio-button-unchecked"
								}
								size={15}
								color="black"
							/>
						</TouchableOpacity>

						<Text>20</Text>
					</View>
					<View style={styles.paginationOption}>
						<TouchableOpacity
							onPress={() => {
								setPaginateOption(40);
							}}
						>
							<MaterialIcons
								name={
									paginateOption == 40
										? "radio-button-checked"
										: "radio-button-unchecked"
								}
								size={15}
								color="black"
							/>
						</TouchableOpacity>
						<Text>40</Text>
					</View>
					<View style={styles.paginationOption}>
						<TouchableOpacity
							onPress={() => {
								setPaginateOption(60);
							}}
						>
							<MaterialIcons
								name={
									paginateOption == 60
										? "radio-button-checked"
										: "radio-button-unchecked"
								}
								size={15}
								color="black"
							/>
						</TouchableOpacity>
						<Text>60</Text>
					</View>
				</View>
				<View style={styles.item}>
					<Text style={[styles.id, { fontWeight: "bold" }]}>Id</Text>
					<Text style={[styles.name, { fontWeight: "bold" }]}>Name</Text>
					<Text style={[styles.email, { fontWeight: "bold" }]}>Email</Text>
				</View>
				<Animated.FlatList
					style={{ width, height: "65%", marginBottom: "4%" }}
					data={users}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Item item={item} />}
				/>

				<View style={styles.container_button}>
					<TouchableOpacity
						disabled={page == 1 ? true : false}
						style={[styles.prev, page == 1 ? styles.disabled : ""]}
						onPress={() => {
							if (page > 1) {
								setPage((prev) => {
									return prev - 1;
								});
							}
						}}
					>
						<Text style={styles.button_text}>Prev</Text>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={page == max ? true : false}
						style={[styles.next, page == max ? styles.disabled : ""]}
						onPress={() => {
							if (page < max) {
								setPage((prev) => {
									return prev + 1;
								});
							}
						}}
					>
						<Text style={styles.button_text}>Next</Text>
					</TouchableOpacity>
				</View>
				{/* <PaginationDot activeDotColor={"black"} curPage={page} maxPage={20} /> */}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		paddingBottom: "2%",
		fontSize: 18,
		textAlign: "center",
	},
	pagination: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		marginBottom: "5%",
	},
	paginationOption: {
		flexDirection: "row",
		alignItems: "center",
	},
	headText: {
		position: "absolute",
		fontSize: 22,
		left: "8%",
		bottom: "30%",
		color: "white",
	},
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	container_flatlist: {},
	header: {
		paddingHorizontal: "5%",
		paddingVertical: "5%",
		backgroundColor: "#f92b48",
		marginBottom: "2%",
		justifyContent: "flex-end",
		alignItems: "flex-end",
		position: "relative",
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
	button: {},
	button_text: { color: "white" },
	disabled: {
		backgroundColor: "gray",
	},
	next: {
		width: "20%",
		flex: 1,
		backgroundColor: "#f92b48",
		justifyContent: "center",
		alignItems: "center",
		position: "absolute",
		right: "10%",
		height: "100%",
		borderRadius: 5,
		color: "white",
	},
	container_button: {
		display: "flex",
		flexDirection: "row",
		position: "relative",
	},
	prev: {
		width: "20%",

		backgroundColor: "#f92b48",
		alignItems: "center",
		padding: "3%",
		borderRadius: 5,
		marginLeft: "10%",
	},
});
