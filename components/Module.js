import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Module = ({ days, title, icon, image, link }) => {
	const rows = Number.isInteger(Math.sqrt(days)) ? Math.sqrt(days) : Math.floor(Math.sqrt(days)) + 1;
	const columns = Number.isInteger(Math.sqrt(days)) ? Math.sqrt(days) : Math.floor(Math.sqrt(days)) + 1;
	const [daysLeft, setDaysLeft] = useState(days - 1);
	const [percent, setPercent] = useState(100);
	const [dayCompleted, setDayCompleted] = useState("INCOMPLETE");
	const [buttonColor, setButtonColor] = useState("white");
	const [currentDate, setCurrentDate] = useState(new Date().toISOString().split("T")[0]);
	const [gridData, setGridData] = useState(
		Array.from({ length: rows }, (_, rowIndex) =>
			Array.from({ length: columns }, (_, colIndex) => ({
				key: `${rowIndex}-${colIndex}`,
			}))
		)
	);

	const handlePress = () => {
		// const today = new Date().toISOString().split("T")[0];
		// if (today == currentDate) {
		// 	console.log(currentDate);
		// }
		setDaysLeft(daysLeft - 1);
		setPercent((daysLeft / days) * 100);
		if (daysLeft <= 0) {
			setDayCompleted("EARNED");
		} else if (dayCompleted == "INCOMPLETE") {
			setDayCompleted("COMPLETED");
		} else if (dayCompleted == "COMPLETED") {
			setDayCompleted("INCOMPLETE");
		}
		const max = rows;
		const min = 0;
		const updatedGridData = [...gridData];
		updatedGridData[Math.floor(Math.random() * (max - min)) + min][Math.floor(Math.random() * (max - min)) + min].style = styles.updatedStyle; // Update the style here
		return updatedGridData;
	};

	const gridRows = gridData.map((row, rowIndex) => (
		<View key={rowIndex} style={styles.row}>
			{row.map(({ key, style }, colIndex) => (
				<View key={key} style={[styles.gridBox, style]} />
			))}
		</View>
	));

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>{title.toUpperCase()}</Text>
				{/* <Text style={styles.title}>{Math.round(percent)}%</Text> */}
				<Text style={styles.text}>
					{daysLeft}/{days} Days Left
				</Text>
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
});
