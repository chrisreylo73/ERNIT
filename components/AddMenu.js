import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { BlurView } from "expo-blur";
// import { v4 as uuidv4 } from "uuid";

const AddMenu = ({ setAddMenuVisible, isAddMenuVisible, data, setData }) => {
	const [numRows, setNumRows] = useState("");
	const [title, setTitle] = useState("");
	const [totalDays, setTotalDays] = useState("");
	const [rewardLink, setRewardLink] = useState("");
	const [rewardImage, setRewardImage] = useState(null);
	const [gridData, setGridData] = useState([]);

	const handleCloseButton = () => {
		setTitle("");
		setTotalDays("");
		setRewardLink("");
		setNumRows(0);
		setGridData([]);
		setRewardImage(null);
		setAddMenuVisible(false);
	};

	useEffect(() => {
		setNumRows(Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1);
	}, [totalDays]);

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

	const getRandomTileIndex = (rows) => {
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * rows);
		while (gridData[randomRow][randomColumn].visible === false) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * rows);
		}
		return `${randomRow}-${randomColumn}`;
	};

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

	const handleCreateButtonPress = async () => {
		if (!title || !totalDays || !rewardLink || !rewardImage) {
			console.log("title: ", title);
			console.log("totalDays: ", totalDays);
			console.log("RewardLink: ", rewardLink);
			console.log("RewardImage: ", rewardImage);
			return;
		}

		const newModule = {
			id: String(Date.now().toString(36) + Math.random().toString(36).substring(2, 12).padStart(12, 0)),
			title: title,
			totalDays: totalDays,
			rewardLink: rewardLink,
			rewardImage: rewardImage,
			rows: numRows,
			columns: numRows,
			tilesLeft: numRows * numRows,
			daysLeft: totalDays,
			dayCompleted: "INCOMPLETE",
			currentDate: String(new Date().getDate()),
			randomTileKeys: updateTileKeys(),
			addBack: 0,
			gridData: gridData,
			// daysCompleted: [],
			// dateCreated: new Date(),
			// currentStreak: 0,
			// highestStreak: 0,
			// completionRate: 0,
			// consistencyRate: 0,
		};
		console.log("NEW MODULE: ", newModule);

		setData((prevData) => [...prevData, newModule]);

		try {
			await AsyncStorage.setItem("modules", JSON.stringify([...data, newModule]));
			setTitle("");
			setTotalDays("");
			setRewardLink("");
			setRewardImage(null);
			setAddMenuVisible(false);
		} catch (error) {
			console.error("Error saving data:", error);
		}
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isAddMenuVisible} onRequestClose={handleCloseButton}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Action Title:</Text>
					<TextInput placeholder="Enter daily action title" value={title} onChangeText={(text) => setTitle(text)} style={styles.modalInput} />
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
				<TouchableOpacity style={styles.closeButton} onPress={handleCloseButton}>
					<AntDesign name="close" size={24} color="white" />
				</TouchableOpacity>
			</BlurView>
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
		marginTop: 10,
		borderRadius: 20,
	},
	closeButton: {
		position: "absolute",
		top: 20,
		right: 20,
	},
});
