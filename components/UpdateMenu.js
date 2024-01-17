import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpdateMenu = ({ isUpdateMenuVisible, setUpdateMenuVisible, data, setData, item }) => {
	const [ernitModuleTitle, setErnitModuleTitle] = useState("");
	const [totalDays, setTotalDays] = useState("");
	const [rewardLink, setRewardLink] = useState("");
	const [rewardImage, setRewardImage] = useState(null);
	const [daysLeft, setDaysLeft] = useState("");

	useEffect(() => {
		loadData();
	}, [isUpdateMenuVisible]);

	const loadData = async () => {
		try {
			const storedData = await AsyncStorage.getItem("modules");
			if (storedData) {
				const modules = JSON.parse(storedData);
				const selectedModule = modules.find((module) => module.id === item.id);

				if (selectedModule) {
					// Populate the input fields with the previous data
					setErnitModuleTitle(selectedModule.title || "");
					setTotalDays(selectedModule.totalDays ? String(selectedModule.totalDays) : "");
					setDaysLeft(selectedModule.daysLeft ? String(selectedModule.daysLeft) : "");
					setRewardLink(selectedModule.link || "");
					setRewardImage(selectedModule.image || null);
				}
			}
		} catch (error) {
			console.error("Error loading data:", error);
		}
	};

	const handleCloseButton = () => {
		setErnitModuleTitle("");
		setTotalDays("");
		setDaysLeft("");
		setRewardLink("");
		setRewardImage(null);
		setUpdateMenuVisible(false);
	};

	// const handleDaysLeftUpdate = () => {

	// }

	const handleUpdateButtonPress = async () => {
		if (!ernitModuleTitle || !totalDays || !rewardLink || !rewardImage || !daysLeft) {
			console.log("ernitModuleTitle: ", ernitModuleTitle);
			console.log("totalDays: ", totalDays);
			console.log("RewardLink: ", rewardLink);
			console.log("RewardImage: ", rewardImage);
			console.log("daysLeft: ", daysLeft);
			return;
		}

		const updatedData = data.map((module) => {
			if (module.id === item.id) {
				return {
					...module,
					totalDays: parseInt(totalDays),
					title: ernitModuleTitle,
					image: rewardImage,
					link: rewardLink,
					daysLeft: parseInt(daysLeft),
					// Update other properties as needed
				};
			} else {
				return module;
			}
		});

		setData(updatedData);

		try {
			await AsyncStorage.setItem("modules", JSON.stringify(updatedData));
			setErnitModuleTitle("");
			setTotalDays("");
			setRewardLink("");
			setRewardImage(null);
			setUpdateMenuVisible(false);
			setDaysLeft("");
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isUpdateMenuVisible} onRequestClose={handleCloseButton}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Action Title:</Text>
					<TextInput placeholder="Enter daily action title" value={ernitModuleTitle} onChangeText={(text) => setErnitModuleTitle(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Total Days:</Text>
					<TextInput placeholder="Enter number of days" keyboardType="numeric" style={styles.modalInput} value={totalDays} onChangeText={(text) => setTotalDays(text)} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}> Days Left:</Text>
					<TextInput placeholder="Enter number of days left" keyboardType="numeric" style={styles.modalInput} value={daysLeft} onChangeText={(text) => setDaysLeft(text)} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Link:</Text>
					<TextInput placeholder="http://" value={rewardLink} onChangeText={(text) => setRewardLink(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Image:</Text>
					<ImagePickerComponent setRewardImage={setRewardImage} rewardImage={rewardImage} />
				</View>
				<TouchableOpacity style={styles.updateButton} onPress={handleUpdateButtonPress}>
					<MaterialCommunityIcons name="circle-edit-outline" size={34} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={handleCloseButton}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
			</BlurView>
		</Modal>
	);
};

export default UpdateMenu;

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
	// createButton: {
	// 	alignItems: "center",
	// 	justifyContent: "center",
	// 	padding: 16,
	// 	marginTop: 10,
	// 	borderRadius: 20,
	// },
	buttonText: {
		textAlign: "center",
		flex: 1,
		color: "white",
		fontSize: 16,
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
	updateButton: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		marginTop: 10,
		borderRadius: 20,
	},
	closeButton: {
		position: "absolute",
		top: 20,
		right: 20,
	},
});
