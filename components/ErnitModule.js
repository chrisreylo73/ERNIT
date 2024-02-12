// Import necessary modules and components
import React, { useState, useEffect, useRef } from "react";
import { Linking, StyleSheet, Text, View, Image, TouchableOpacity, Animated, Easing } from "react-native";
import { BlurView } from "expo-blur";
import ActionsMenu from "./ActionsMenu";

// Define the ErnitModule component
const ErnitModule = ({ item, data, setData, onUpdate, onDelete }) => {
	// State variables for module properties
	const [tilesLeft, setTilesLeft] = useState(item.tilesLeft);
	const [daysLeft, setDaysLeft] = useState(item.daysLeft);
	const [taskFinished, setTaskFinished] = useState(item.taskFinished);
	const [randomTileKeys, setRandomTileKeys] = useState(item.randomTileKeys);
	const [addBack, setAddBack] = useState(item.addBack);
	const [gridData, setGridData] = useState(item.gridData);
	const [currentDate, setCurrentDate] = useState(item.currentDate);
	const [daysCompleted, setDaysCompleted] = useState(item.daysCompleted);
	const [isActionsMenuVisible, setActionsMenuVisible] = useState(false);
	const fadeAnim = useRef(new Animated.Value(0)).current;

	// Animation effect for fading in the module
	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
			easing: Easing.linear,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	// Update module when taskFinished changes
	useEffect(() => {
		onUpdate({ ...item, taskFinished, tilesLeft, gridData, daysLeft, addBack, currentDate, randomTileKeys, daysCompleted });
	}, [taskFinished]);

	// Check and update currentDate if needed
	useEffect(() => {
		console.log("currentDate: ", currentDate);
		console.log("formatCurrentDate(): ", formatCurrentDate());
		if (daysLeft !== 0 && currentDate !== formatCurrentDate()) {
			setTaskFinished(false);
			setCurrentDate(formatCurrentDate());
			updateTileKeys();
		}
	}, []);

	// Update randomTileKeys when currentDate changes
	// useEffect(() => {
	// 	if (daysLeft !== 0) {
	// 	}
	// }, [currentDate]);

	// Handle module press event
	const handlePress = () => {
		if (taskFinished === false) {
			if (tilesLeft - daysLeft === 0) {
				setTilesLeft((tilesLeft) => tilesLeft - 1);
				updateGridData(randomTileKeys[0]);
				setAddBack(1);
			} else {
				setTilesLeft((tilesLeft) => tilesLeft - 2);
				updateGridData(randomTileKeys[0]);
				updateGridData(randomTileKeys[1]);
				setAddBack(2);
			}
			setDaysLeft((daysLeft) => daysLeft - 1);
			setDaysCompleted([...daysCompleted, formatCurrentDate()]);
		}
		if (taskFinished === true) {
			if (addBack === 1) {
				setTilesLeft((tilesLeft) => tilesLeft + 1);
				updateGridData(randomTileKeys[0]);
			} else if (addBack === 2) {
				setTilesLeft((tilesLeft) => tilesLeft + 2);
				updateGridData(randomTileKeys[0]);
				updateGridData(randomTileKeys[1]);
			}
			setDaysLeft((daysLeft) => daysLeft + 1);
			removeDate(formatCurrentDate());
		}
		setTaskFinished((prevTaskFinished) => !prevTaskFinished);
	};

	// Format the current date as "YYYY-MM-DD"
	const formatCurrentDate = () => {
		//2024-01-22
		//2024-11-22
		const currentDate = new Date().toLocaleDateString().split("/");
		const formattedDate = currentDate[0].length > 1 ? `${currentDate[2]}-${currentDate[0]}-${currentDate[1]}` : `${currentDate[2]}-0${currentDate[0]}-${currentDate[1]}`;
		console.log(formattedDate);
		return formattedDate;
	};

	// Update randomTileKeys
	const updateTileKeys = () => {
		let a = getRandomTileIndex(item.rows);
		let b = getRandomTileIndex(item.rows);
		if (item.daysLeft === 1 && item.totalDays === 2) {
			setRandomTileKeys([getRandomTileIndex(item.rows), getRandomTileIndex(item.rows)]);
		} else if (item.daysLeft === 1) {
			setRandomTileKeys([a]);
		} else {
			while (a === b) {
				a = getRandomTileIndex(item.rows);
				b = getRandomTileIndex(item.rows);
			}
			setRandomTileKeys([a, b]);
		}
	};

	// Get a random tile index
	// EX: 1-2
	const getRandomTileIndex = (rows) => {
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * rows);
		while (gridData[randomRow][randomColumn].visible === false) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * rows);
		}
		return `${randomRow}-${randomColumn}`;
	};

	// Remove a date from the daysCompleted array
	const removeDate = (dateToRemove) => {
		const updatedDays = daysCompleted.filter((date) => date !== dateToRemove);
		setDaysCompleted(updatedDays);
	};

	// Update gridData to toggle visibility of a grid box
	const updateGridData = (index) => {
		const updatedGridData = [...gridData];
		const [rowIndex, colIndex] = index.split("-");
		updatedGridData[rowIndex][colIndex].visible = !updatedGridData[rowIndex][colIndex].visible;
		setGridData(updatedGridData);
	};

	// Open the reward link if daysLeft is 0
	handleLink = () => {
		if (daysLeft === 0) {
			Linking.openURL(item.rewardLink).catch((err) => console.error("An error occurred while opening the link:", err));
		}
		console.log(item);
	};

	// Render the ErnitModule component
	return (
		<Animated.View style={{ opacity: fadeAnim }}>
			<BlurView intensity={100} tint="dark" style={styles.container}>
				<View style={styles.info}>
					<TouchableOpacity style={styles.header} onPress={() => setActionsMenuVisible(true)}>
						<Text style={styles.title}>{item.title.toUpperCase()}</Text>
						<View style={styles.dayCounter}>
							{daysLeft === 0 ? (
								<Text style={[styles.text, { color: "#FFD700", fontSize: 16 }]}>{item.totalDays} Days Completed</Text>
							) : (
								<>
									<Text style={styles.text}>
										{daysLeft}/{item.totalDays} Days Left
									</Text>
								</>
							)}
						</View>
					</TouchableOpacity>
					{daysLeft === 0 ? (
						<View style={styles.earned}>
							<Text style={[styles.buttonText, { color: "#111111" }]}>{"EARNED"}</Text>
						</View>
					) : (
						<>
							<TouchableOpacity style={[styles.button, { backgroundColor: taskFinished === true ? "#111111" : taskFinished === false ? "white" : "#FFD700" }]} onPress={handlePress}>
								<Text style={[styles.buttonText, { color: taskFinished === false ? "#111111" : "white" }]}>{taskFinished === false ? "INCOMPLETE" : "COMPLETED"}</Text>
							</TouchableOpacity>
						</>
					)}
				</View>
				<TouchableOpacity style={[styles.imageContainer]} onPress={handleLink}>
					<Image source={{ uri: item.rewardImage }} style={styles.image} />
					<View style={styles.overlay}>
						{gridData.map((row, rowIndex) => (
							<View key={rowIndex} style={styles.row}>
								{row.map(({ key, visible }) => (
									<View key={key} style={[styles.gridBox, { opacity: visible ? 1 : 0 }]} />
								))}
							</View>
						))}
					</View>
				</TouchableOpacity>
				<ActionsMenu item={item} data={data} setData={setData} onUpdate={onUpdate} onDelete={onDelete} isActionsMenuVisible={isActionsMenuVisible} setActionsMenuVisible={setActionsMenuVisible} daysCompleted={daysCompleted} setDaysCompleted={setDaysCompleted} currentDate={currentDate} removeDate={removeDate} daysLeft={daysLeft} />
			</BlurView>
		</Animated.View>
	);
};

export default ErnitModule;

// Styles for the component
const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		overflow: "hidden",
		justifyContent: "space-between",
		alignItems: "center",
		width: 360,
		padding: 10,
		//borderWidth: 1,
		borderRadius: 15,
		marginVertical: 5,
		height: 170,
		// shadowColor: "#000",
		// shadowOffset: { width: 0, height: 2 },
		// shadowOpacity: 0.5,
		// shadowRadius: 2,
		elevation: 8,
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
		height: 140,
		width: 140,
		resizeMode: "cover",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: "row",
	},
	title: {
		overflow: "hidden",
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 8,
		color: "white",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	text: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#4a4a4e",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	earned: {
		backgroundColor: "#FFD700",
		padding: 6,
		alignSelf: "center",
		borderRadius: 5,
		width: 170,
		height: 35,
		borderWidth: 0,
	},
	button: {
		padding: 6,
		alignSelf: "center",
		borderRadius: 5,
		width: 170,
		height: 35,
		borderWidth: 0,
	},
	buttonText: {
		textAlign: "center",
		flex: 1,
		color: "black",
		fontSize: 16,
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
	header: {},
	info: {
		width: 180,
		height: "100%",
		padding: 4,
		fex: 1,
		justifyContent: "space-between",
	},
	row: {
		flex: 1,
	},
	gridBox: {
		flex: 1,
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: "#4a4a4e",
		margin: -0.5,
		backgroundColor: "rgba(0, 0, 0, 0.85)",
	},
	dayCounter: {
		flexDirection: "row",
	},
});
