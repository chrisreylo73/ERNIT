import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import ErnitModule from "./components/ErnitModule";
import ImagePickerComponent from "./ImagePickerComponent";
// import AddMenu from "./components/AddMenu";

const AddMenu = ({ setModalVisible, isModalVisible, data, setData }) => {
	const [ernitModuleTitle, setErnitModuleTitle] = useState("");
	const [totalDays, setTotalDays] = useState("");
	const [rewardLink, setRewardLink] = useState("");
	const [rewardImage, setRewardImage] = useState(null);
	// const [data, setData] = useState([]);

	const handleCreateButtonPress = async () => {
		console.log("Data:", data);
		if (!ernitModuleTitle || !totalDays || !rewardLink || !rewardImage) {
			console.log("ernitModuleTitle: ", ernitModuleTitle);
			console.log("totalDays: ", totalDays);
			console.log("RewardLink: ", rewardLink);
			console.log("RewardImage: ", rewardImage);
			return;
		}
		const newModule = {
			id: String(data.length + 1),
			totalDays: parseInt(totalDays),
			title: ernitModuleTitle,
			image: rewardImage,
			link: rewardLink,
		};
		setData((prevData) => [...prevData, newModule]);
		try {
			await AsyncStorage.setItem("modules", JSON.stringify([...data, newModule]));
			setErnitModuleTitle("");
			setTotalDays("");
			setRewardLink("");
			setRewardImage(null);
			setModalVisible(false);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const storedData = await AsyncStorage.getItem("modules");
			if (storedData) {
				setData(JSON.parse(storedData));
			}
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};
	return (
		<Modal animationType="fade" transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
			<View style={styles.modalContainer}>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Action Title:</Text>
					<TextInput placeholder="Enter daily action title" value={ernitModuleTitle} onChangeText={(text) => setErnitModuleTitle(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Total Days:</Text>
					<TextInput placeholder="Enter number of days" keyboardType="numeric" style={styles.modalInput} value={totalDays} onChangeText={(text) => setTotalDays(text)} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Link:</Text>
					<TextInput placeholder="http://" value={rewardLink} onChangeText={(text) => setRewardLink(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Image:</Text>
					<ImagePickerComponent setRewardImage={setRewardImage} rewardImage={rewardImage} />
				</View>
				<TouchableOpacity style={styles.createButton} onPress={handleCreateButtonPress}>
					<AntDesign name="plus" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default AddMenu;

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#111111",
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
		padding: 16,
		borderRadius: 20,
	},
	closeButton: {
		position: "absolute",
		bottom: 25,
	},
});
