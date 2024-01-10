import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import React, { useState } from "react";
import ErnitModule from "./components/ErnitModule";
import ImagePickerComponent from "./components/ImagePickerComponent";
import { AntDesign } from "@expo/vector-icons";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [titleInput, setTitleInput] = useState("");
	const [totalDaysInput, setTotalDaysInput] = useState("");
	const [rewardLinkInput, setRewardLinkInput] = useState("");
	const [rewardImage, setRewardImage] = useState(null);
	const [data, setData] = useState([
		//accentColor: "rgba(170, 216, 92, 0.6)}"
		//accentColor: "rgba(255, 0, 0, 0.6)"
		//accentColor: "rgba(128, 0, 128, 0.6)"
		//accentColor: "rgba(150, 216, 250, 0.6)"
		{ id: "1", totalDays: 36, title: "Guitar", image: require("./assets/Forte-Port-Nylon-HO.png"), link: "https://www.michaelkellyguitars.com/en/products/view/forte-port-nylon" },
		{ id: "2", totalDays: 25, title: "Basketball", image: require("./assets/1.jpg"), link: "https://www.flightclub.com/air-jordan-12-retro-cool-grey-white-team-orange-011569" },
		{ id: "3", totalDays: 16, title: "Leet Code", image: require("./assets/nirvana.jpg"), link: "https://example.com/module1" },
		{ id: "4", totalDays: 9, title: "Make an APP", image: require("./assets/2.jpg"), link: "https://www.amazon.com/dp/B06XNX6QJ4/?coliid=I34XSE63MAY7VL&colid=299X7CKVGCA6D&psc=0&ref_=list_c_wl_lv_ov_lig_dp_it" },
		{ id: "5", totalDays: 4, title: "Workout", image: require("./assets/3.jpg"), link: "https://powerblock.com/product/commercial-pro-175-lb-adjustable-dumbbell/" },
	]);

	const handleCreateButtonPress = () => {
		// Validate input fields before adding a new module
		if (!titleInput || !totalDaysInput || !rewardLinkInput || !rewardImage) {
			// Handle validation error (you can display an alert or do something else)
			return;
		}

		// Add a new module to the data array
		const newModule = {
			id: String(data.length + 1),
			totalDays: parseInt(totalDaysInput),
			title: titleInput,
			image: rewardImage,
			link: rewardLinkInput,
			// Add other properties as needed
		};

		// Update the data state with the new module
		setData((prevData) => [...prevData, newModule]);
		// Close the modal
		setModalVisible(false);
		// Clear input fields
		setTitleInput("");
		setTotalDaysInput("");
		setRewardLinkInput("");
		setRewardImage(null);
	};

	const handlePress = () => {
		// Your button press logic here
		console.log("Button pressed!");
	};

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Header />
			<View style={styles.list}>
				<FlatList showsVerticalScrollIndicator={false} data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ErnitModule totalDays={item.totalDays} title={item.title} image={item.image} link={item.link} accentColor={item.accentColor} />} />
			</View>
			<Footer setModalVisible={setModalVisible} />
			<Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
				<View style={styles.modalContainer}>
					{/* <Text style={styles.modalText}>Create New </Text> */}
					<View style={styles.modalContainerRow}>
						<Text style={styles.modalText}>Action Title:</Text>
						<TextInput placeholder="Enter daily action title" value={titleInput} onChangeText={(text) => setTitleInput(text)} style={styles.modalInput} />
					</View>
					<View style={styles.modalContainerRow}>
						<Text style={styles.modalText}>Total Days:</Text>
						<TextInput placeholder="Enter number of days" keyboardType="numeric" style={styles.modalInput} value={totalDaysInput} onChangeText={(text) => setTotalDaysInput(text)} />
					</View>
					<View style={styles.modalContainerRow}>
						<Text style={styles.modalText}>Reward Link:</Text>
						<TextInput placeholder="http://" value={rewardLinkInput} onChangeText={(text) => setRewardLinkInput(text)} style={styles.modalInput} />
					</View>
					<View style={styles.modalContainerRow}>
						<Text style={styles.modalText}>Reward Image:</Text>
						<ImagePickerComponent />
					</View>
					<TouchableOpacity style={styles.createButton} onPress={handleCreateButtonPress}>
						<AntDesign name="plus" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
						<AntDesign name="close" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</Modal>
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
		// paddingTop: 100,
		flex: 1,
		width: "100%", // Adjust width as needed
		justifyContent: "center",
		alignItems: "center",
		// paddingHorizontal: 2,
		// marginVertical: 60,
		marginTop: 80,
		marginBottom: 62,
		// overflow: "hidden",
		// paddingTop: 20,
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "black",
		padding: 12,
		borderRadius: 20,
		// marginBottom: 100,
		//borderWidth: 1,
	},
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, .92)",
		width: "100%",
		hight: "100%",
	},
	modalContainerRow: {
		padding: 10,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		width: "90%",
	},
	modalText: {
		color: "white",
		fontSize: 18,
		marginRight: 10,
		// marginBottom: 20,
	},
	modalInput: {
		backgroundColor: "white",
		width: 200,
		borderRadius: 5,
		padding: 3,
	},
	createButton: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "black",
		padding: 16,
		borderRadius: 20,
	},
	closeButton: {
		position: "absolute",
		bottom: 25,
	},
});
