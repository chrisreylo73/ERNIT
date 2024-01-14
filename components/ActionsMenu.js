import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const ActionsMenu = ({ isActionsMenuVisible, setActionsMenuVisible, data, setData, item }) => {
	const handleDeleteButtonPress = async (id) => {
		// Filter out the module with the specified ID
		const updatedData = data.filter((module) => module.id !== id);

		// Update the data state
		setData(updatedData);

		// Update AsyncStorage
		updateAsyncStorage(updatedData);

		// Close the actions menu
		setActionsMenuVisible(false);
	};

	const updateAsyncStorage = async (updatedData) => {
		try {
			await AsyncStorage.setItem("modules", JSON.stringify(updatedData));
		} catch (error) {
			console.error("Error updating AsyncStorage:", error);
		}
	};

	return (
		<Modal animationType="fade" transparent={true} visible={isActionsMenuVisible} onRequestClose={() => setActionsMenuVisible(false)}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteButtonPress(item.id)}>
					<MaterialIcons name="delete-outline" size={24} color="white" />
				</TouchableOpacity>
			</BlurView>
		</Modal>
	);
};

export default ActionsMenu;

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
	deleteButton: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		borderRadius: 20,
	},
	closeButton: {
		position: "absolute",
		top: 20,
		right: 20,
	},
});
