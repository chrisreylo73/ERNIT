import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
const ErnitModule = ({ totalDays, title, image, link, accentColor }) => {
	const rows = Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1;
	const columns = rows;
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
			{row.map(({ key, style }) => (
				<View key={key} style={[styles.gridBox, { backgroundColor: accentColor || "rgba(0, 0, 0, .85)" }, style]} />
			))}
		</View>
	));

	const handlePress = () => {
		if (daysLeft === 1 && dayCompleted === "INCOMPLETE") {
			// Just in case of error remove any box that still has not been removed, remove all boxes
			if (new Set(removedGridBoxes).size !== removedGridBoxes.length) {
				for (let x = 0; x < gridData.length; x++) {
					for (let y = 0; y < gridData[x].length; y++) {
						// make each box transparent
						gridData[x][y].style = styles.updatedStyle;
					}
				}
			}
			setRemovedGridBoxes((removedGridBoxes) => [...removedGridBoxes, handleGridBoxRemoval()]);
			setGridBoxesLeft((gridBoxesLeft) => gridBoxesLeft - 1);
			setDaysLeft((daysLeft) => daysLeft - 1);
			setDayCompleted("EARNED");
		} else if (dayCompleted === "INCOMPLETE" && daysLeft !== 0) {
			if (gridBoxesLeft - daysLeft === 0) {
				setRemovedGridBoxes((removedGridBoxes) => [...removedGridBoxes, handleGridBoxRemoval()]);
				setGridBoxesLeft((gridBoxesLeft) => gridBoxesLeft - 1);
			} else {
				setRemovedGridBoxes((removedGridBoxes) => [...removedGridBoxes, handleGridBoxRemoval(), handleGridBoxRemoval()]);
				setGridBoxesLeft((gridBoxesLeft) => gridBoxesLeft - 2);
			}
			setDaysLeft((daysLeft) => daysLeft - 1);
			setDayCompleted("COMPLETED");
		} else if (dayCompleted === "COMPLETED" && daysLeft !== 0) {
			setDayCompleted("INCOMPLETE");
			// setDaysLeft((daysLeft) => daysLeft + 1);
		}
	};

	handleLink = () => {
		if (daysLeft === 0) {
			Linking.openURL(link).catch((err) => console.error("An error occurred while opening the link:", err));
		}
	};

	const handleGridBoxRemoval = () => {
		// Get random indices between 0 and number of rows/columns
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * columns);
		let selectedBoxKey = gridData[randomRow][randomColumn].key;

		// Make sure the selected box hasn't been removed in the current call
		while (removedGridBoxes.includes(selectedBoxKey)) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * columns);
			selectedBoxKey = gridData[randomRow][randomColumn].key;
		}

		// Make the new random gridBox transparent
		gridData[randomRow][randomColumn].style = styles.updatedStyle;
		console.log(selectedBoxKey);

		// if (new Set(removedGridBoxes).size !== removedGridBoxes.length) {
		// 	console.log("WELP");
		// }

		return selectedBoxKey;
	};

	return (
		<BlurView intensity={100} tint="dark" style={styles.container}>
			<View style={styles.info}>
				<TouchableOpacity style={styles.header}>
					<Text style={styles.title}>{title.toUpperCase()}</Text>
					<View style={styles.dayCounter}>
						<Text style={[styles.text, { color: "white" }]}>{daysLeft}</Text>
						<Text style={styles.text}>/{totalDays} Days Left</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: dayCompleted === "COMPLETED" ? "#111111" : "white" }]} onPress={handlePress}>
					<Text style={[styles.buttonText, { color: dayCompleted === "COMPLETED" ? "#f5f5f5" : "#111111" }]}>{dayCompleted}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={styles.imageContainer} onPress={handleLink}>
				<Image source={image} style={styles.image} />
				<View style={styles.overlay}>{gridRows}</View>
			</TouchableOpacity>
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
		// marginTop: 10,
		borderWidth: 1,
		borderRadius: 15,
		marginVertical: 5,
		// marginBottom: 8,
		//backgroundColor: "black",
		// backgroundColor: "#111111",
		//backgroundColor: "#2d3460",
		borderColor: "#080808",
		//borderColor: "#49528f",
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
		//color: "#49528f",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	button: {
		marginTop: 10,
		// backgroundColor: "white",
		padding: 6,

		borderRadius: 5,
		width: 170,
		height: 35,
		// elevation: 20,
		borderWidth: 0,
		// borderColor: "#363637",
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
		justifyContent: "space-between",
		alignItems: "center",
	},
	info: {
		marginLeft: 8,
		justifyContent: "space-between",
		alignItems: "center",
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
