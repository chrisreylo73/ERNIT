import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const UpdateMenu = ({ isUpdateMenuVisible, setUpdateMenuVisible, data, setData, item, onUpdate }) => {
	const [title, setTitle] = useState(item.title);
	const [totalDays, setTotalDays] = useState(item.totalDays);
	const [rewardLink, setRewardLink] = useState(item.rewardLink);
	const [rewardImage, setRewardImage] = useState(item.rewardImage);
	// const [daysLeft, setDaysLeft] = useState(item.daysLeft);
	const [errorMessage, setErrorMessage] = useState("");
	const [gotError, setGotError] = useState(false);

	const isValidUrl = (url) => {
		// Regular expression to check if the URL is valid
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	const resetError = () => {
		setTimeout(() => {
			setGotError(false);
		}, 5000);
	};

	const handleUpdateButtonPress = async () => {
		if (!title) {
			setGotError(true);
			setErrorMessage("Please fill out the title");
			resetError();
			console.log("title: ", title);
			console.log("totalDays: ", totalDays);
			console.log("RewardLink: ", rewardLink);
			console.log("RewardImage: ", rewardImage);
			return;
		} else if (!totalDays) {
			setGotError(true);
			setErrorMessage("Please fill out the total days");
			resetError(false);
			return;
		} else if (totalDays > 100) {
			setGotError(true);
			setErrorMessage("Total days is limited to 100 days for performance");
			resetError(false);
			return;
		} else if (!rewardLink) {
			setGotError(true);
			setErrorMessage("Please fill out the reward link");
			resetError(false);
			return;
		}
		// else if (!isValidUrl(rewardLink)) {
		// 	setGotError(true);
		// 	setErrorMessage("Invalid Link");
		// 	resetError(false);
		// 	return;
		// }
		else if (!rewardImage) {
			setGotError(true);
			setErrorMessage("Please select a reward image");
			resetError(false);
			return;
		}
		setErrorMessage(false);
		setErrorMessage("");

		onUpdate({ ...item, title, totalDays: parseInt(totalDays), rewardImage: rewardImage, rewardLink: rewardLink });
		setUpdateMenuVisible(false);
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isUpdateMenuVisible} onRequestClose={() => setUpdateMenuVisible(false)}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Action Title:</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="Enter daily action title" value={title} onChangeText={(text) => setTitle(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Total Days:</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="Enter number of days" keyboardType="numeric" style={styles.modalInput} value={totalDays.toString()} onChangeText={(text) => setTotalDays(text)} />
				</View>
				{/* <View style={styles.modalContainerRow}>
					<Text style={styles.modalText}> Days Left:</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="Enter number of days left" keyboardType="numeric" style={styles.modalInput} value={daysLeft.toString()} onChangeText={(text) => setDaysLeft(text)} />
				</View> */}
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Link:</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="http://" value={rewardLink} onChangeText={(text) => setRewardLink(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Reward Image:</Text>
					<ImagePickerComponent setRewardImage={setRewardImage} rewardImage={rewardImage} />
				</View>
				<TouchableOpacity style={styles.updateButton} onPress={handleUpdateButtonPress}>
					<MaterialCommunityIcons name="circle-edit-outline" size={34} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={() => setUpdateMenuVisible(false)}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={[styles.error, , { opacity: gotError ? 1 : 0 }]} onPress={() => setGotError(false)} disabled={!gotError}>
					<Text style={[styles.errorText]}>ERROR: {errorMessage}</Text>
				</TouchableOpacity>
			</BlurView>
		</Modal>
	);
};

export default UpdateMenu;

const styles = StyleSheet.create({
	error: {
		justifyContent: "center",
		alignItems: "center",
		bottom: 15,
		position: "absolute",
		backgroundColor: "#d4596c",
		width: "90%",
		height: 60,
		borderRadius: 10,
		padding: 10,
	},
	errorText: {
		color: "white",
		fontSize: 15,
	},
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
		backgroundColor: "#111111",
		borderColor: "#2b2b2b",
		borderWidth: 1,
		color: "white",
		width: 200,
		borderRadius: 5,
		padding: 3,
		paddingLeft: 5,
		paddingRight: 5,
	},
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
