import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const Module = ({ days, title, icon, image }) => {
	const rows = Number.isInteger(Math.sqrt(days)) ? Math.sqrt(days) : Math.floor(Math.sqrt(days)) + 1;
	const columns = Number.isInteger(Math.sqrt(days)) ? Math.sqrt(days) : Math.floor(Math.sqrt(days)) + 1;
	const [daysLeft, setDaysLeft] = useState(days - 1);
	const [percent, setPercent] = useState(100);
	const [dayComplete, setDayComplete] = useState("INCOMPLETE");
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
			setDayComplete("EARNED");
			setButtonColor("yellow");
		} else if (dayComplete == "INCOMPLETE") {
			setDayComplete("COMPLETE");
		} else if (dayComplete == "COMPLETE") {
			setDayComplete("INCOMPLETE");
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
				<Text style={styles.title}>{Math.round(percent)}%</Text>
				<TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={handlePress}>
					<Text style={styles.buttonText}>{dayComplete}</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.imageContainer}>
				<Image source={require("../assets/Forte-Port-Nylon-HO.png")} style={styles.image} />
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
		width: 380,
		// width: "400px",
		padding: 5,
		// height: "300px",
		backgroundColor: "#252526",
		elevation: 20,
		// shadowColor: "black",
		border: "none",
		borderRadius: 15,
	},
	imageContainer: {
		// position: "relative",
		height: 170,
		width: 170,
		overflow: "hidden",
		backgroundColor: "#262266",
		borderRadius: 10,
		elevation: -40,
	},
	image: {
		height: 170,
		width: 170,
		resizeMode: "cover",
		borderRadius: 10,
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		flexDirection: "row",
	},
	title: {
		// marginTop: 100,
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		// color: "white",
		fontFamily: "Roboto",
		letterSpacing: 2,
	},
	button: {
		marginTop: 10,
		backgroundColor: "white",
		padding: 10,
		borderRadius: 5,
		width: 180,
		height: 40,
		elevation: 20,
		borderWidth: 1,
		borderColor: "#f0f0f0",
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
		borderWidth: 2,
		borderColor: "black",
		backgroundColor: "rgba(0, 0, 0, .8)", // Semi-transparent green background
	},
	updatedStyle: {
		// Style to be applied when the button is pressed
		backgroundColor: "transparent", // Change this to your desired style
		// borderColor: "transparent",
	},
});
