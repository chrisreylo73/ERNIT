import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput, Image, ScrollView, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Calendar } from "react-native-calendars";
import * as Progress from "react-native-progress";
import UpdateMenu from "./UpdateMenu";

const ActionsMenu = ({ item, isActionsMenuVisible, setActionsMenuVisible, data, setData, onUpdate, onDelete }) => {
	const [isUpdateMenuVisible, setUpdateMenuVisible] = useState(false);
	const [completionRate, setCompletionRate] = useState(0);
	useEffect(() => {
		getCompletionRate();
	}, [item.daysLeft]);

	const handleDeleteButtonPress = () => {
		Alert.alert(
			"Confirm Deletion",
			"Are you sure you want to delete this module?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => {
						onDelete(item.id);
						setActionsMenuVisible(false);
					},
					style: "destructive", // You can use 'destructive' for the delete button to highlight its significance
				},
			],
			{ cancelable: false }
		);
		// setCompletionRate(1 - item.daysLeft / item.totalDays);
	};

	const getCompletionRate = async () => {
		//const a = item.dateCreated.split("-");
		// const a = "1-10-2024".split("-");
		const a = item.daysCompleted[0].split("-");
		const b = item.daysCompleted[item.daysCompleted.length - 1].split("-");
		console.log("a", a);
		console.log("b", b);
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const firstDate = new Date(a[2], a[0], a[1]);
		const secondDate = new Date(b[2], b[0], b[1]);
		const numDatesBetween = Math.round(Math.abs((secondDate - firstDate) / oneDay) + 1);
		console.log("numDatesBetween", numDatesBetween);
		console.log("daysCompleted length", item.daysCompleted.length);
		console.log(item.daysCompleted.length / numDatesBetween);
		setCompletionRate(item.daysCompleted.length / numDatesBetween);
	};

	return (
		<Modal animationType="fade" transparent={true} visible={isActionsMenuVisible} onRequestClose={() => setActionsMenuVisible(false)}>
			<BlurView style={styles.modalContainer} tint="dark" intensity={100}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
					<View style={styles.header}>
						<Text style={styles.title}>{item.title.toUpperCase()}</Text>
					</View>
					<TouchableOpacity style={[styles.imageContainer]} onPress={handleLink}>
						<Image source={{ uri: item.rewardImage }} style={styles.image} />
						<View style={styles.overlay}>
							{item.gridData.map((row, rowIndex) => (
								<View key={rowIndex} style={styles.row}>
									{row.map(({ key, visible }) => (
										<View key={key} style={[styles.gridBox, { opacity: visible ? 1 : 0 }]} />
									))}
								</View>
							))}
						</View>
					</TouchableOpacity>
					<View style={styles.statsContainer}>
						<View style={styles.dayCounter}>
							<Text style={styles.statsText}>DAYS LEFT</Text>
							<Text style={[styles.statsText, { color: "white" }]}>
								{item.daysLeft}/{item.totalDays}
							</Text>
						</View>
						<Text style={styles.statsText}>COMPLETION STATUS</Text>
						<View style={styles.progressBarOverlay}>
							<Text style={styles.progressBarPercent}>{Math.round((1 - item.daysLeft / item.totalDays) * 100)}%</Text>
							<Progress.Bar borderRadius={10} height={17} unfilledColor="#111111" borderWidth={0} progress={1 - item.daysLeft / item.totalDays} width={330} color={"white"} style={{ marginBottom: 20 }} />
						</View>
						<Text style={styles.statsText}>CONSISTENCY RATE </Text>
						<View style={styles.progressBarOverlay}>
							<Text style={styles.progressBarPercent}>{Math.round(completionRate * 100)}%</Text>
							<Progress.Bar borderRadius={10} height={17} unfilledColor="#111111" borderWidth={0} progress={completionRate} width={330} color={"white"} style={{ marginBottom: 20 }} />
						</View>
						{/* <View style={styles.circleStats}>
							<View style={styles.streak}>
								<Text style={styles.statsText}>CURRENT STREAK</Text>
								<Text style={[styles.statsText, { color: "white" }]}>6</Text>
							</View>
							<View style={styles.streak}>
								<Text style={styles.statsText}>HIGHEST STREAK</Text>
								<Text style={[styles.statsText, { color: "white" }]}>12</Text>
							</View>
						</View> */}
					</View>
					<View style={styles.calendarContainer}>
						<Calendar
							style={styles.calendar}
							hideExtraDays={true}
							onDayPress={(day) => {
								console.log("selected day", day);
							}}
							theme={{
								backgroundColor: "#111111",
								calendarBackground: "#111111",
								textSectionTitleColor: "#b6c1cd",
								textSectionTitleDisabledColor: "#d9e1e8",
								selectedDayBackgroundColor: "#ffffff",
								selectedDayTextColor: "#111111",
								todayTextColor: "#00adf5",
								dayTextColor: "#4a4a4e",
								textDisabledColor: "#d9e1e8",
								dotColor: "#00adf5",
								selectedDotColor: "#ffffff",
								arrowColor: "#ffffff",
								disabledArrowColor: "#d9e1e8",
								monthTextColor: "#ffffff",
								indicatorColor: "blue",
								textDayFontFamily: "Roboto",
								textMonthFontFamily: "Roboto",
								textDayHeaderFontFamily: "Roboto",
								textDayFontWeight: "300",
								textMonthFontWeight: "bold",
								textDayHeaderFontWeight: "300",
								textDayFontSize: 16,
								textMonthFontSize: 16,
								textDayHeaderFontSize: 16,
							}}
						/>
					</View>
				</ScrollView>
				<View style={styles.actionButtons}>
					<TouchableOpacity style={styles.closeButton} onPress={() => setActionsMenuVisible(false)}>
						<AntDesign name="close" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.updateButton} onPress={() => setUpdateMenuVisible(true)}>
						<Feather name="edit-3" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.deleteButton} onPress={handleDeleteButtonPress}>
						<MaterialIcons name="delete-outline" size={24} color="white" />
					</TouchableOpacity>
				</View>
				{/* <View>
					<View>
						<TouchableOpacity>
							<Text></Text>
						</TouchableOpacity>
					</View>
				</View> */}
			</BlurView>
			<UpdateMenu data={data} setData={setData} onUpdate={onUpdate} isUpdateMenuVisible={isUpdateMenuVisible} setUpdateMenuVisible={setUpdateMenuVisible} item={item} />
		</Modal>
	);
};

export default ActionsMenu;

const styles = StyleSheet.create({
	progressBarOverlay: {
		marginTop: 3,
		alignItems: "center",
	},
	progressBarPercent: {
		color: "#4a4a4e",
		position: "absolute",
		zIndex: 2,
		fontSize: 12,
	},
	dayCounter: {
		// flexDirection: "row",
		marginTop: 11,
		alignItems: "center",
	},
	calendarContainer: {
		width: "100%",
		backgroundColor: "#111111",
		marginTop: 180,
	},
	calendar: {
		width: 350,
		borderRadius: 20,
		marginTop: 20,
		marginBottom: 20,
		marginHorizontal: 17,
	},
	scrollContainer: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
	},
	container: {
		flexDirection: "row",
		overflow: "hidden",
		alignItems: "center",
		//padding: 10,
		borderWidth: 1,
		borderRadius: 15,
		marginVertical: 5,
	},
	statsContainer: {
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
	},
	circleStats: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		width: 330,
	},
	statsText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#4a4a4e",
		fontFamily: "Roboto",
		letterSpacing: 2,
		marginVertical: 5,
	},
	streak: {
		alignItems: "center",
		justifyContent: "center",
	},
	header: {
		// position: "absolute",
		marginTop: 20,
		width: 260,
		borderRadius: 100,
		alignItems: "center",
		// top: 0,
		// zIndex: 2,
	},
	title: {
		// marginTop: 40,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
		marginBottom: 15,
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
		// borderRadius: 10,
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
		top: 5,
		right: 0,
		// zIndex: 2,
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
