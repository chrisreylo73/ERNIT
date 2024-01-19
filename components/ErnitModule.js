import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";
import ActionsMenu from "./ActionsMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ErnitModule = ({ item, data, setData, onUpdate, onDelete }) => {
	const [tilesLeft, setTilesLeft] = useState(item.tilesLeft);
	const [daysLeft, setDaysLeft] = useState(item.daysLeft);
	const [dayCompleted, setDayCompleted] = useState(item.dayCompleted);
	const [randomTileKeys, setRandomTileKeys] = useState(item.randomTileKeys);
	const [addBack, setAddBack] = useState(item.addBack);
	const [gridData, setGridData] = useState(item.gridData);
	const [currentDate, setCurrentDate] = useState(item.currentDate);

	const [loading, setLoading] = useState(true);
	const [isActionsMenuVisible, setActionsMenuVisible] = useState(false);

	const updateTileKeys = async () => {
		let a = getRandomTileIndex(item.rows);
		let b = getRandomTileIndex(item.rows);
		if (item.totalDays == 1) {
			setRandomTileKeys([a]);
		} else {
			while (a === b) {
				a = getRandomTileIndex(item.rows);
				b = getRandomTileIndex(item.rows);
			}
			setRandomTileKeys([a, b]);
		}
		// onUpdate({ ...item, randomTileKeys });
	};

	const getRandomTileIndex = async (rows) => {
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * rows);
		while (gridData[randomRow][randomColumn].visible === false) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * rows);
		}
		return `${randomRow}-${randomColumn}`;
	};

	const handlePress = () => {
		if (dayCompleted === false) {
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
		} else if (dayCompleted === true) {
			if (addBack === 1) {
				setTilesLeft((tilesLeft) => tilesLeft + 1);
				updateGridData(randomTileKeys[0]);
			} else if (addBack === 2) {
				setTilesLeft((tilesLeft) => tilesLeft + 2);
				updateGridData(randomTileKeys[0]);
				updateGridData(randomTileKeys[1]);
			}
			setDaysLeft((daysLeft) => daysLeft + 1);
		}
		setDayCompleted(!dayCompleted);
		// onUpdate({ ...item, tilesLeft, gridData, daysLeft, addBack });
	};

	const updateGridData = (index) => {
		const updatedGridData = [...gridData];
		const [rowIndex, colIndex] = index.split("-");
		updatedGridData[rowIndex][colIndex].visible = !updatedGridData[rowIndex][colIndex].visible;
		setGridData(updatedGridData);
	};

	handleLink = () => {
		if (daysLeft === 0) {
			Linking.openURL(item.rewardLink).catch((err) => console.error("An error occurred while opening the link:", err));
		}
	};

	return (
		<BlurView intensity={100} tint="dark" style={styles.container}>
			{/* {loading ? (
				<ActivityIndicator size="large" color="#FFFFFF" />
			) : (
				<> */}
			<View style={styles.info}>
				<TouchableOpacity style={styles.header} onPress={() => setActionsMenuVisible(true)}>
					<Text style={styles.title}>{item.title.toUpperCase()}</Text>
					<View style={styles.dayCounter}>
						{daysLeft === 0 ? (
							<Text style={[styles.text, { color: "#FFD700", fontSize: 16 }]}>{item.totalDays} Days Completed</Text>
						) : (
							<>
								<Text style={[styles.text, { color: "white" }]}>{daysLeft}</Text>
								<Text style={styles.text}>/{item.totalDays} Days Left</Text>
							</>
						)}
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: dayCompleted === true ? "#111111" : dayCompleted === false ? "white" : "#FFD700" }]} onPress={handlePress}>
					<Text style={[styles.buttonText, { color: dayCompleted === false ? "#111111" : "white" }]}>{dayCompleted === false ? "INCOMPLETE" : "COMPLETED"}</Text>
				</TouchableOpacity>
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
			<ActionsMenu item={item} data={data} setData={setData} onUpdate={onUpdate} onDelete={onDelete} isActionsMenuVisible={isActionsMenuVisible} setActionsMenuVisible={setActionsMenuVisible} />
			{/* </>
			)} */}
		</BlurView>
	);
};

export default ErnitModule;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		overflow: "hidden",
		justifyContent: "space-between",
		alignItems: "center",
		width: 360,
		padding: 10,
		borderWidth: 1,
		borderRadius: 15,
		marginVertical: 5,
		height: 170,
		borderColor: "#080808",
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
		borderRadius: 10,
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
	updatedStyle: {
		backgroundColor: "transparent",
		borderColor: "transparent",
	},
	dayCounter: {
		flexDirection: "row",
	},
});

// const saveData = async () => {
// 	try {
// 		const updatedData = data.map((module) => {
// 			if (module.id === item.id) {
// 				return {
// 					...module,
// 					tilesLeft: parseInt(tilesLeft),
// 					daysLeft: parseInt(daysLeft),
// 					dayCompleted: dayCompleted,
// 					currentDate: currentDate,
// 					randomTileKeys: randomTileKeys,
// 					addBack: parseInt(addBack),
// 					gridData: gridData,
// 				};
// 			}
// 			return module;
// 		});
// 		setData(updatedData);
// 		await AsyncStorage.setItem("modules", JSON.stringify(data));
// 	} catch (error) {
// 		console.error("Error saving data:", error);
// 	}
// };
// useEffect(() => {
// 	const saveDataAsync = async () => {
// 		await saveData();
// 	};
// 	saveDataAsync();
// }, []);

// useEffect(() => {
// 	loadData();
// }, []);

// useEffect(() => {
// 	saveData();
// }, [dayCompleted]);

// const loadData = async () => {
// 	try {
// 		const storedData = await AsyncStorage.getItem("modules");
// 		if (currentDate !== new Date().getDate()) {
// 			setAddBack(0);
// 			setDayCompleted("INCOMPLETE");
// 			updateTileKeys();
// 			setCurrentDate(new Date().getDate());

// 			if (storedData) {
// 				const modules = JSON.parse(storedData);
// 				const selectedModule = modules.find((module) => module.id === item.id);
// 				if (selectedModule) {
// 					// Populate the input fields with the previous data
// 					setGridData(selectedModule.gridData);
// 					setTilesLeft(selectedModule.tilesLeft);
// 					setDaysLeft(selectedModule.daysLeft);
// 					// setDayCompleted(selectedModule.dayCompleted);
// 					// setCurrentDate(selectedModule.currentDate);
// 					// setRandomTileKeys(selectedModule.randomTileKeys);
// 					// setAddBack(selectedModule.addBack);
// 				}
// 			}
// 		} else {
// 			if (storedData) {
// 				const modules = JSON.parse(storedData);
// 				const selectedModule = modules.find((module) => module.id === item.id);
// 				if (selectedModule) {
// 					// Populate the input fields with the previous data
// 					setGridData(item.gridData);
// 					setTilesLeft(item.tilesLeft);
// 					setDaysLeft(item.daysLeft);
// 					setDayCompleted(item.dayCompleted);
// 					setCurrentDate(item.currentDate);
// 					setRandomTileKeys(item.randomTileKeys);
// 					setAddBack(item.addBack);
// 				}
// 			}
// 		}

// 		setLoading(false);
// 	} catch (error) {
// 		console.error("Error loading data:", error);
// 	}
// };
