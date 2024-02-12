import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
// import ExtraDimensions from "react-native-extra-dimensions-android";

const AddMenu = ({ setAddMenuVisible, isAddMenuVisible, data, setData }) => {
	const [numRows, setNumRows] = useState("");
	const [title, setTitle] = useState("");
	const [totalDays, setTotalDays] = useState("");
	const [rewardLink, setRewardLink] = useState("");
	const [rewardImage, setRewardImage] = useState(null);
	const [gridData, setGridData] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	const [gotError, setGotError] = useState(false);

	// Close the modal and reset state variables
	const handleClose = () => {
		Keyboard.dismiss();
		setTitle("");
		setTotalDays("");
		setRewardLink("");
		setNumRows(0);
		setGridData([]);
		setRewardImage(null);
		setAddMenuVisible(false);
		setErrorMessage(false);
		setErrorMessage("");
	};

	// Update numRows based on totalDays
	useEffect(() => {
		setNumRows(Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1);
	}, [totalDays]);

	// Update gridData based on numRows
	useEffect(() => {
		setGridData(
			Array.from({ length: numRows }, (_, rowIndex) =>
				Array.from({ length: numRows }, (_, colIndex) => ({
					key: `${rowIndex}-${colIndex}`,
					visible: true,
				}))
			)
		);
	}, [numRows]);

	// Get a random tile index based on the number of rows
	const getRandomTileIndex = (rows) => {
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * rows);
		while (gridData[randomRow][randomColumn].visible === false) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * rows);
		}
		return `${randomRow}-${randomColumn}`;
	};

	// Update randomTileKeys based on numRows and totalDays
	const updateTileKeys = () => {
		let a = getRandomTileIndex(numRows);
		let b = getRandomTileIndex(numRows);
		if (totalDays == 1) {
			return [a];
		} else {
			while (a === b) {
				a = getRandomTileIndex(numRows);
				b = getRandomTileIndex(numRows);
			}
			return [a, b];
		}
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

	// Format the current date as "YYYY-MM-DD"
	const formatCurrentDate = () => {
		const currentDate = new Date().toLocaleDateString().split("/");
		const formattedDate = currentDate[0].length > 1 ? `${currentDate[2]}-${currentDate[0]}-${currentDate[1]}` : `${currentDate[2]}-0${currentDate[0]}-${currentDate[1]}`;
		console.log(formattedDate);
		return formattedDate;
	};

	// Handle button press to create a new module
	const handleCreateButtonPress = async () => {
		// Validation for input fields
		if (!title) {
			setGotError(true);
			setErrorMessage("Please fill out the title");
			resetError(false);
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
		} else if (!isValidUrl(rewardLink)) {
			setGotError(true);
			setErrorMessage("Invalid Link");
			resetError(false);
			return;
		} else if (!rewardImage) {
			setGotError(true);
			setErrorMessage("Please select a reward image");
			resetError(false);
			return;
		}
		setErrorMessage(false);
		setErrorMessage("");

		// Create a new module object
		const newModule = {
			id: String(Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0)),
			title: title,
			totalDays: parseInt(totalDays),
			rewardLink: rewardLink,
			rewardImage: rewardImage,
			rows: parseInt(numRows),
			columns: parseInt(numRows),
			tilesLeft: parseInt(numRows * numRows),
			daysLeft: parseInt(totalDays),
			taskFinished: false,
			currentDate: formatCurrentDate(),
			randomTileKeys: updateTileKeys(),
			addBack: 0,
			gridData: gridData,
			daysCompleted: [],
			dateCreated: formatCurrentDate(),
		};

		// Update state and save data to AsyncStorage
		setData((prevData) => [...prevData, newModule]);
		try {
			await AsyncStorage.setItem("modules", JSON.stringify([...data, newModule]));
			handleClose();
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	// Render the AddMenu component
	return (
		<Modal style={styles.modal} isVisible={isAddMenuVisible} animationIn="slideInUp" animationOut="slideOutDown" animationInTiming={500} animationOutTiming={500} coverScreen={true} hasBackdrop={true} backdropOpacity={1} backdropColor="#111111" onRequestClose={handleClose}>
			<View style={styles.modalContainer} tint="dark" intensity={100}>
				<View style={styles.header}>
					<Text style={styles.title}>CREATE NEW MODULE</Text>
				</View>
				<KeyboardAvoidingView style={styles.modalContainerRow} behavior="none">
					<Text style={styles.modalText}>TASK TITLE</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="EX: Practice Guitar" value={title} onChangeText={(text) => setTitle(text)} style={styles.modalInput} />
				</KeyboardAvoidingView>
				<KeyboardAvoidingView style={styles.modalContainerRow} behavior="none">
					<Text style={styles.modalText}>TOTAL DAYS</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="EX: 30" keyboardType="numeric" style={styles.modalInput} value={totalDays} onChangeText={(text) => setTotalDays(text)} />
				</KeyboardAvoidingView>
				<KeyboardAvoidingView style={styles.modalContainerRow} behavior="none">
					<Text style={styles.modalText}>REWARD LINK</Text>
					<TextInput placeholderTextColor="#4a4a4e" placeholder="http://" value={rewardLink} onChangeText={(text) => setRewardLink(text)} style={styles.modalInput} />
				</KeyboardAvoidingView>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>REWARD IMAGE</Text>
					<ImagePickerComponent setRewardImage={setRewardImage} rewardImage={rewardImage} />
				</View>
				<TouchableOpacity style={styles.createButton} onPress={handleCreateButtonPress}>
					<AntDesign name="plus" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={styles.closeButton} onPress={handleClose}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
				<TouchableOpacity style={[styles.error, { opacity: gotError ? 1 : 0 }]} onPress={() => setGotError(false)} disabled={!gotError}>
					<Text style={[styles.errorText]}>ERROR: {errorMessage}</Text>
				</TouchableOpacity>
			</View>
		</Modal>
	);
};

export default AddMenu;

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
	modalContainer: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#111111",
		// width: "100%",
		// height: "100%",
	},
	modalContainerRow: {
		marginVertical: 6,
		justifyContent: "flex-start",
		alignItems: "left",
		marginLeft: 50,
		width: "100%",
	},
	modalText: {
		color: "white",
		fontSize: 16,
		marginBottom: 2,
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
	createButton: {
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
