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
	const [daysLeft, setDaysLeft] = useState(item.daysLeft);

	const handleUpdateButtonPress = async () => {
		if (!title || !totalDays || !rewardLink || !rewardImage || !daysLeft) {
			console.log("title: ", title);
			console.log("totalDays: ", totalDays);
			console.log("RewardLink: ", rewardLink);
			console.log("RewardImage: ", rewardImage);
			console.log("daysLeft: ", daysLeft);
			return;
		}
		onUpdate({ ...item, title, totalDays: parseInt(totalDays), daysLeft: parseInt(daysLeft), rewardImage: rewardImage, rewardlink: rewardLink });
		setUpdateMenuVisible(false);
	};

	return (
		<Modal animationType="slide" transparent={true} visible={isUpdateMenuVisible} onRequestClose={() => setUpdateMenuVisible(false)}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Action Title:</Text>
					<TextInput placeholder="Enter daily action title" value={title} onChangeText={(text) => setTitle(text)} style={styles.modalInput} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}>Total Days:</Text>
					<TextInput placeholder="Enter number of days" keyboardType="numeric" style={styles.modalInput} value={totalDays.toString()} onChangeText={(text) => setTotalDays(text)} />
				</View>
				<View style={styles.modalContainerRow}>
					<Text style={styles.modalText}> Days Left:</Text>
					<TextInput placeholder="Enter number of days left" keyboardType="numeric" style={styles.modalInput} value={daysLeft.toString()} onChangeText={(text) => setDaysLeft(text)} />
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
				<TouchableOpacity style={styles.closeButton} onPress={() => setUpdateMenuVisible(false)}>
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
