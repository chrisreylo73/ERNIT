// Import necessary modules and components
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { BlurView } from "expo-blur";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Modal from "react-native-modal";

const UpdateMenu = ({ isUpdateMenuVisible, setUpdateMenuVisible, item, onUpdate }) => {
	const [title, setTitle] = useState(item.title);
	const [rewardLink, setRewardLink] = useState(item.rewardLink);
	const [rewardImage, setRewardImage] = useState(item.rewardImage);
	const [errorMessage, setErrorMessage] = useState("");
	const [gotError, setGotError] = useState(false);

	const handleClose = () => {
		Keyboard.dismiss();
		setTitle("");
		setRewardLink("");
		setRewardImage(null);
		setUpdateMenuVisible(false);
		setErrorMessage(false);
		setErrorMessage("");
	};

	// Validate if the URL is in a valid format
	const isValidUrl = (url) => {
		// Regular expression to check if the URL is valid
		const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
		return urlPattern.test(url);
	};

	// Reset error state after a timeout
	const resetError = () => {
		setTimeout(() => {
			setGotError(false);
		}, 5000);
	};

	// Handle button press to update a module
	const handleUpdateButtonPress = async () => {
		// Validation for input fields
		if (!title) {
			setGotError(true);
			setErrorMessage("Please fill out the title");
			resetError(false);
			return;
		} else if (!rewardLink) {
			setGotError(true);
			setErrorMessage("Please fill out the reward link");
			resetError(false);
			return;
		} else if (!rewardImage) {
			setGotError(true);
			setErrorMessage("Please select a reward image");
			resetError(false);
			return;
		} else if (!isValidUrl(rewardLink)) {
			setGotError(true);
			setErrorMessage("Invalid Link");
			resetError(false);
			return;
		}
		Keyboard.dismiss();
		setErrorMessage(false);
		setErrorMessage("");

		// Update state and trigger onUpdate callback
		onUpdate({ ...item, title, rewardImage: rewardImage, rewardLink: rewardLink });
		setUpdateMenuVisible(false);
	};

	// Render the UpdateMenu component
	return (
		<Modal style={styles.modal} isVisible={isUpdateMenuVisible} animationIn="slideInUp" animationOut="slideOutDown" animationInTiming={500} animationOutTiming={500} coverScreen={true} hasBackdrop={true} backdropOpacity={1} backdropColor="#111111" onRequestClose={handleClose}>
			<View style={styles.modalContainer}>
				<View style={styles.header}>
					<Text style={styles.title}>UPDATE MODULE</Text>
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>TASK TITLE</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="EX: Practice Guitar" value={title} onChangeText={(text) => setTitle(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>REWARD LINK</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="http://" value={rewardLink} onChangeText={(text) => setRewardLink(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>REWARD IMAGE</Text>
					<ImagePickerComponent setRewardImage={setRewardImage} rewardImage={rewardImage} />
				</View>
				<TouchableOpacity style={styles.updateButton} onPress={handleUpdateButtonPress}>
					<MaterialCommunityIcons name="circle-edit-outline" size={34} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={() => setUpdateMenuVisible(false)}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={[styles.error, { opacity: gotError ? 1 : 0 }]} onPress={() => setGotError(false)} disabled={!gotError}>
					<Text style={[styles.errorText]}>ERROR: {errorMessage}</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default UpdateMenu;

// Styles for the component
const styles = StyleSheet.create({
	modal: {
		margin: 0,
		justifyContent: "flex-end",
		width: "100%",
		height: "100%",
		flex: 1,
		alignSelf: "center",
	},
	header: {
		marginTop: 20,
		width: 260,
		borderRadius: 100,
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		color: "white",
		fontSize: 18,
	},
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
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#111111",
		width: "100%",
		height: "100%",
	},
	modalContainerRow: {
		marginVertical: 8,
		justifyContent: "flex-start",
		alignItems: "left",
		marginLeft: 50,
		width: "100%",
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
		width: "90%",
		paddingLeft: 15,
		paddingRight: 15,
		height: 45,
		borderRadius: 10,
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

/// FOR FUTURE FEATURES

// else if (!totalDays) {
// 	setGotError(true);
// 	setErrorMessage("Please fill out the total days");
// 	resetError(false);
// 	return;
// }
// else if (totalDays > 100) {
// 	setGotError(true);
// 	setErrorMessage("Total days is limited to 100 days for performance");
// 	resetError(false);
// 	return;
// }
// else if (item.totalDays >= totalDays) {
// 	setGotError(true);
// 	setErrorMessage("You can only increase the the number of total days");
// 	resetError(false);
// }
// else if (!isValidUrl(rewardLink)) {
// 	setGotError(true);
// 	setErrorMessage("Invalid Link");
// 	resetError(false);
// 	return;
// }

// useEffect(() => {
// 	for (let i = 0; i < item.daysCompleted.length; i++) {
// 		updateGridData();
// 	}
// }, [gridData]);

// useEffect(() => {
// 	setNumRows(Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1);
// }, [totalDays]);

// useEffect(() => {
// 	setGridData(
// 		Array.from({ length: numRows }, (_, rowIndex) =>
// 			Array.from({ length: numRows }, (_, colIndex) => ({
// 				key: `${rowIndex}-${colIndex}`,
// 				visible: true,
// 			}))
// 		)
// 	);
// }, [numRows]);

// const updateGridData = (index) => {
// 	const updatedGridData = [...gridData];
// 	const [rowIndex, colIndex] = index.split("-");
// 	updatedGridData[rowIndex][colIndex].visible = !updatedGridData[rowIndex][colIndex].visible;
// 	setGridData(updatedGridData);
// };

// const getRandomTileIndex = (rows) => {
// 	let randomRow = Math.floor(Math.random() * rows);
// 	let randomColumn = Math.floor(Math.random() * rows);
// 	while (gridData[randomRow][randomColumn].visible === false) {
// 		randomRow = Math.floor(Math.random() * rows);
// 		randomColumn = Math.floor(Math.random() * rows);
// 	}
// 	return `${randomRow}-${randomColumn}`;
// };
