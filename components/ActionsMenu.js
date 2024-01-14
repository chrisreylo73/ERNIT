import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import ImagePickerComponent from "./ImagePickerComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
//import { Calendar } from "react-native-calendars";
import { Calendar } from "react-native-calendars";
import * as Progress from "react-native-progress";

const ActionsMenu = ({ title, image, gridRows, isActionsMenuVisible, setActionsMenuVisible, data, setData, item }) => {
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

	const handleUpdateButtonPress = async (id) => {};

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
				<View style={styles.header}>
					<Text style={styles.title}>{title.toUpperCase()}</Text>
				</View>
				{/* <View style={styles.container}> */}
				<TouchableOpacity style={[styles.imageContainer]} onPress={handleLink}>
					<Image source={{ uri: image }} style={styles.image} />
					<View style={styles.overlay}>{gridRows}</View>
				</TouchableOpacity>
				<View style={styles.statsContainer}>
					<Progress.Bar progress={0.3} width={250} color={"white"} />
					<Progress.Bar progress={0.3} width={250} color={"white"} />
					<Progress.Bar progress={0.3} width={250} color={"white"} />
				</View>
				{/* </View> */}
				<Calendar
					style={{
						// borderWidth: 1,
						// borderColor: "gray",
						// height: 350,
						width: 350,
						padding: 10,
						borderRadius: 20,
					}}
					theme={{
						//backgroundColor: "rgba(0, 0, 0, .1)",
						calendarBackground: "rgba(0, 0, 0, .2)",
						textSectionTitleColor: "#b6c1cd",
						selectedDayBackgroundColor: "#00adf5",
						selectedDayTextColor: "#ffffff",
						todayTextColor: "#00adf5",
						dayTextColor: "#2d4150",
					}}
				/>
				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.closeButton} onPress={() => setActionsMenuVisible(false)}>
						<AntDesign name="close" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.updateButton} onPress={() => handleUpdateButtonPress(item.id)}>
						<Feather name="edit-3" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteButtonPress(item.id)}>
						<MaterialIcons name="delete-outline" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</BlurView>
		</Modal>
	);
};

export default ActionsMenu;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		overflow: "hidden",
		// justifyContent: "space-between",
		alignItems: "center",
		// width: 360,
		padding: 10,
		borderWidth: 1,
		borderRadius: 15,
		marginVertical: 5,
		// height: 170,
		// borderColor: "#080808",
	},
	statsContainer: {
		marginVertical: 20,
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
	},
	header: {
		// position: "absolute",
		width: "100%",
		borderRadius: 100,
		alignItems: "center",
		// top: 0,
		// zIndex: 2,
	},
	title: {
		marginTop: 40,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
		marginBottom: 10,
	},
	imageContainer: {
		aspectRatio: 1,
		overflow: "hidden",
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "#4a4a4e",
		backgroundColor: "white",
	},
	image: {
		height: 260,
		width: 260,
		resizeMode: "cover",
		borderRadius: 10,
	},
	gridBox: {
		flex: 1,
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: "#4a4a4e",
		margin: -0.5,
		backgroundColor: "rgba(0, 0, 0, 0.85)",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: "row",
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
		backgroundColor: "white",
		width: 200,
		borderRadius: 5,
		padding: 3,
	},
	actionButtons: {
		position: "absolute",
		top: 10,
		right: 5,
		zIndex: 2,
	},
	deleteButton: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		borderRadius: 20,
	},
	updateButton: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		borderRadius: 20,
	},
	closeButton: {
		alignItems: "center",
		justifyContent: "center",
		padding: 16,
		borderRadius: 20,
	},
});
