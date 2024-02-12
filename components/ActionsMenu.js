// Import necessary modules and components
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Calendar } from "react-native-calendars";
import * as Progress from "react-native-progress";
import UpdateMenu from "./UpdateMenu";
import Modal from "react-native-modal";

// Define the ActionsMenu functional component
const ActionsMenu = ({ item, isActionsMenuVisible, setActionsMenuVisible, data, setData, onUpdate, onDelete, setDaysCompleted, daysCompleted, currentDate, removeDate, daysLeft }) => {
	// State variables
	const [isUpdateMenuVisible, setUpdateMenuVisible] = useState(false);
	const [completionRate, setCompletionRate] = useState(0);
	const [markedDates, setMarkedDates] = useState({});

	// useEffect hook to update completion rate and marked dates when daysCompleted changes
	useEffect(() => {
		getCompletionRate();
		markDatesFromArray();
	}, [daysCompleted]);

	// Function to handle delete button press, showing confirmation alert
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
					style: "destructive",
				},
			],
			{ cancelable: false }
		);
	};

	// Function to mark dates from daysCompleted array on the calendar
	const markDatesFromArray = () => {
		const markedDatesObj = {};
		daysCompleted.forEach((date) => {
			markedDatesObj[date] = { selected: true, selectedColor: "white" };
		});
		setMarkedDates(markedDatesObj);
	};

	// Function to calculate and set the completion rate
	const getCompletionRate = () => {
		if (daysCompleted.length !== 0) {
			const a = daysCompleted[0].split("-");
			const b = currentDate.split("-");
			const oneDay = 24 * 60 * 60 * 1000;
			const firstDate = new Date(a[1], a[0], a[2]);
			const secondDate = new Date(b[1], b[0], b[2]);
			const numDatesBetween = Math.round(Math.abs((secondDate - firstDate) / oneDay) + 1);
			setCompletionRate(daysCompleted.length / numDatesBetween);
		} else {
			setCompletionRate(0);
		}
	};

	// Render the ActionsMenu component
	return (
		<Modal style={styles.modal} isVisible={isActionsMenuVisible} animationIn="fadeIn" animationOut="fadeOut" animationInTiming={500} animationOutTiming={300} coverScreen={true} hasBackdrop={true} backdropOpacity={1} backdropColor="transparent" onRequestClose={() => setActionsMenuVisible(false)}>
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
					</View>
					<View style={styles.calendarContainer}>
						<Calendar
							style={styles.calendar}
							hideExtraDays={true}
							onDayPress={(day) => {
								// handleCalendarPress(day);
								console.log("selected day", day);
							}}
							markedDates={markedDates}
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
			</BlurView>
			<UpdateMenu data={data} setData={setData} onUpdate={onUpdate} isUpdateMenuVisible={isUpdateMenuVisible} setUpdateMenuVisible={setUpdateMenuVisible} item={item} />
		</Modal>
	);
};

export default ActionsMenu;

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
		marginTop: 20,
		width: 260,
		borderRadius: 100,
		alignItems: "center",
	},
	title: {
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
		height: "100%",
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

// const handleCalendarPress = (day) => {
// if (daysCompleted.length !== 0) {
// 	const startDate = new Date(daysCompleted[0]);
// 	const currentDate = new Date(currentDate);
// 	const dayClicked = new Date(day.dateString);
// 	if (startDate <= dayClicked && dayClicked <= currentDate) {
// 		// IN ARRAY
// 		if (daysCompleted.includes(day.dateString)) {
// 			// 	if (addBack === 1) {
// 			// 		setTilesLeft((tilesLeft) => tilesLeft + 1);
// 			// 		updateGridData(randomTileKeys[0]);
// 			// 	} else if (addBack === 2) {
// 			// 		setTilesLeft((tilesLeft) => tilesLeft + 2);
// 			// 		updateGridData(randomTileKeys[0]);
// 			// 		updateGridData(randomTileKeys[1]);
// 			// 	}
// 			// 	setDaysLeft((daysLeft) => daysLeft + 1);
// 			// 	removeDate(day.dateString);
// 		} else {
// 			// NOT IN ARRAY
// 			// if (tilesLeft - daysLeft === 0) {
// 			// 	setTilesLeft((tilesLeft) => tilesLeft - 1);
// 			// 	updateGridData(randomTileKeys[0]);
// 			// 	setAddBack(1);
// 			// } else {
// 			// 	setTilesLeft((tilesLeft) => tilesLeft - 2);
// 			// 	updateGridData(randomTileKeys[0]);
// 			// 	updateGridData(randomTileKeys[1]);
// 			// 	setAddBack(2);
// 			// }
// 			// setDaysLeft((daysLeft) => daysLeft - 1);
// 			// setDaysCompleted([...daysCompleted, day.dateString]);
// 		}
// 	}
// }
// };
