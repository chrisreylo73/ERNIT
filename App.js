import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import ErnitModule from "./components/ErnitModule";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [menuInput, setMenuInput] = useState("");
	const data = [
		//accentColor: "rgba(170, 216, 92, 0.6)}"
		//accentColor: "rgba(255, 0, 0, 0.6)"
		//accentColor: "rgba(128, 0, 128, 0.6)"
		//accentColor: "rgba(150, 216, 250, 0.6)"
		{ id: "1", totalDays: 36, title: "Guitar", image: require("./assets/Forte-Port-Nylon-HO.png"), link: "https://example.com/module1" },
		{ id: "2", totalDays: 25, title: "Basketball", image: require("./assets/J12.png"), link: "https://example.com/module1" },
		{ id: "3", totalDays: 16, title: "Leet Code", image: require("./assets/nirvana.jpg"), link: "https://example.com/module1" },
		{ id: "4", totalDays: 9, title: "Guitar", image: require("./assets/Forte-Port-Nylon-HO.png"), link: "https://example.com/module1" },
		{ id: "5", totalDays: 4, title: "Basketball", image: require("./assets/J12.png"), link: "https://example.com/module1" },
		{ id: "6", totalDays: 1, title: "Leet Code", image: require("./assets/nirvana.jpg"), link: "https://example.com/module1" },
	];

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>ERN-IT</Text>
				<View style={styles.separator} />
			</View>
			<View style={styles.list}>
				<FlatList data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ErnitModule totalDays={item.totalDays} title={item.title} image={item.image} link={item.link} accentColor={item.accentColor} />} />
			</View>
			<View style={styles.footer}>
				<View style={styles.separator} />
				<TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
					<AntDesign name="plus" size={24} color="white" />
				</TouchableOpacity>
			</View>
			<Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					{/* Your menu content goes here */}
					<Text style={styles.modalText}>Your Menu Content</Text>
					<TextInput placeholder="Enter something" value={menuInput} onChangeText={(text) => setMenuInput(text)} style={styles.modalInput} />
					<TouchableOpacity onPress={() => setModalVisible(false)}>
						<Text style={styles.closeButtonText}>Close</Text>
					</TouchableOpacity>
				</View>
			</Modal>
			<StatusBar style="auto" />
		</View>
	);
}

//rgba(144, 238, 144, 0.7)
const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: "black",
		backgroundColor: "#111111",
		//backgroundColor: "#2d3460",
		alignItems: "center",
		justifyContent: "center", // Center content vertically
	},
	list: {
		flex: 1,
		width: "100%", // Adjust width as needed
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 60,
		overflow: "hidden",
	},
	header: {
		width: "100%",
		marginBottom: 8,
		height: "10%",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 40,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
		marginBottom: 15,
	},
	separator: {
		height: 1,
		backgroundColor: "#363637",
		//backgroundColor: "#49528f",
		width: "90%",
	},
	footer: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		//backgroundColor: "black",
		backgroundColor: "#111111",
		//backgroundColor: "#2d3460",
		height: "9%",
		marginTop: 5,
		bottom: 0,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "black",
		padding: 16,
		borderRadius: 20,
		//borderWidth: 1,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalText: {
		color: "white",
		fontSize: 18,
		marginBottom: 20,
	},
	modalInput: {
		backgroundColor: "white",
		width: 200,
		padding: 10,
		marginBottom: 20,
		borderRadius: 8,
	},
	closeButtonText: {
		color: "white",
		fontSize: 16,
	},
});
