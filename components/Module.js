import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Module = ({ totalDays, title, icon, image, link, color }) => {
	const rows = Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1;
	const columns = Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1;
	const [gridBoxesLeft, setGridBoxesLeft] = useState(rows * columns);
	const [daysLeft, setDaysLeft] = useState(totalDays);
	const [removedGridBoxes, setRemovedGridBoxes] = useState([]);
	const [dayCompleted, setDayCompleted] = useState("INCOMPLETE");
	const [gridData, setGridData] = useState(
		Array.from({ length: rows }, (_, rowIndex) =>
			Array.from({ length: columns }, (_, colIndex) => ({
				key: `${rowIndex}-${colIndex}`,
			}))
		)
	);

	const gridRows = gridData.map((row, rowIndex) => (
		<View key={rowIndex} style={styles.row}>
			{row.map(({ key, style }, colIndex) => (
				<View key={key} style={[styles.gridBox, style]} />
			))}
		</View>
	));

	// useEffect(() => {
	// 	console.log("daysleft: ", daysLeft);
	// 	console.log("gridBoxesLeft: ", gridBoxesLeft);
	// 	console.log("removedGridBoxes", removedGridBoxes);
	// }, [daysLeft, gridData, gridBoxesLeft, removedGridBoxes]);

	// useEffect(() => {
	// 	console.log("removedGridBoxes", removedGridBoxes);
	// 	// console.log("gridData 2", gridData);
	// 	// for (i = 0; i < gridData.length; i++) {
	// 	// 	for (j = 0; j < gridData[i].length; j++) {
	// 	// 		console.log(gridData[i][j]);
	// 	// 	}
	// 	// }
	// }, [removedGridBoxes]);

	const handlePress = () => {
		if (daysLeft !== 0) {
			if (dayCompleted == "INCOMPLETE") {
				if (gridBoxesLeft - daysLeft == 0) {
					// Adds the new indecies to the removedGridBoxes array
					setRemovedGridBoxes([...removedGridBoxes, handleGridBoxRemoval()]);
					// Decrement the number of gridBoxesLeft counter
					setGridBoxesLeft(gridBoxesLeft - 1);
				} else {
					// Adds the new indecies to the removedGridBoxes array
					setRemovedGridBoxes([...removedGridBoxes, handleGridBoxRemoval(), handleGridBoxRemoval()]);
					// Decrement the number of gridBoxesLeft counter
					setGridBoxesLeft(gridBoxesLeft - 2);
				}
				// handleGridBoxRemoval();
				setDaysLeft(daysLeft - 1);
				setDayCompleted("COMPLETED");
			} else if (dayCompleted == "COMPLETED") {
				setDaysLeft(daysLeft + 1);
				setDayCompleted("INCOMPLETE");
			}
		} else {
			setDayCompleted("EARNED");
		}
	};

	const handleGridBoxRemoval = () => {
		// Get random indices between 0 and number of rows/columns
		// for (let i = 0; i < counter; i++) {
		let randomRow = Math.floor(Math.random() * (rows - 0)) + 0;
		let randomColumn = Math.floor(Math.random() * (columns - 0)) + 0;
		// Make sure we are getting indices that haven't been removed
		while (removedGridBoxes.includes(gridData[randomRow][randomColumn].key)) {
			randomRow = Math.floor(Math.random() * (rows - 0)) + 0;
			randomColumn = Math.floor(Math.random() * (columns - 0)) + 0;
		}
		// Make the new random gridBox transparent
		gridData[randomRow][randomColumn].style = styles.updatedStyle; // Update the style here
		// console.log(gridData[randomRow][randomColumn].key);
		return gridData[randomRow][randomColumn].key;
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title.toUpperCase()}</Text>
				<View style={styles.dayCounter}>
					<Text style={[styles.text, { color: "white" }]}>{daysLeft}</Text>
					<Text style={styles.text}>/{totalDays} Days Left</Text>
				</View>
				<TouchableOpacity style={[styles.button, { backgroundColor: dayCompleted === "COMPLETED" ? "black" : "white" }]} onPress={handlePress}>
					<Text style={[styles.buttonText, { color: dayCompleted === "COMPLETED" ? "white" : "black" }]}>{dayCompleted}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.imageContainer}>
				<Image source={image} style={styles.image} />
				<View style={styles.overlay}>{gridRows}</View>
			</View>
		</View>
	);
};

export default Module;

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		overflow: "hidden",
		justifyContent: "space-between",
		alignItems: "center",
		width: 370,
		padding: 7,
		backgroundColor: "#0b0b0b",
		// shadowColor: "black",
		// borderColor: "black",
		borderColor: "#363637",
		borderWidth: 1,
		borderRadius: 15,
		marginBottom: 15,
	},
	imageContainer: {
		height: 160,
		width: 160,
		overflow: "hidden",
		borderWidth: 1,
		backgroundColor: "white",
		borderRadius: 10,
		borderColor: "#4a4a4e",
		elevation: 100,
	},
	image: {
		height: 160,
		width: 160,
		resizeMode: "cover",
		borderRadius: 10,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: "row",
	},
	title: {
		// marginTop: 100,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 5,
		color: "white",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	text: {
		fontSize: 14,
		fontWeight: "bold",
		marginBottom: 40,
		color: "#4a4a4e",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	button: {
		marginTop: 10,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		width: 170,
		height: 40,
		elevation: 20,
		borderWidth: 1,
		borderColor: "#363637",
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
	header: {
		flexDirection: "column",
		justifyContent: "space-between",
		// width: "250px",
		alignItems: "center",
		margin: 5,
		// padding: 4,
		// marginBottom: 10,
	},
	row: {
		flex: 1,
	},
	gridBox: {
		flex: 1,
		aspectRatio: 1,
		borderWidth: 1,
		borderColor: "#4a4a4e",
		// borderRadius: 5,
		backgroundColor: "rgba(0, 0, 0, .8)", // Semi-transparent green background
	},
	updatedStyle: {
		// Style to be applied when the button is pressed
		backgroundColor: "transparent", // Change this to your desired style
		borderColor: "transparent",
	},
	dayCounter: {
		flexDirection: "row",
	},
});
