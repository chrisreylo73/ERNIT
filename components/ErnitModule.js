import React, { useState, useEffect } from "react";
import { Linking, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import ActionsMenu from "./ActionsMenu";

const ErnitModule = ({ totalDays, title, image, link, accentColor, data, setData, item }) => {
	const rows = Number.isInteger(Math.sqrt(totalDays)) ? Math.sqrt(totalDays) : Math.floor(Math.sqrt(totalDays)) + 1;
	const columns = rows;
	const [tilesLeft, setTilesLeft] = useState(rows * columns);
	const [daysLeft, setDaysLeft] = useState(totalDays);
	const [removedTiles, setRemovedTiles] = useState([]);
	const [isActionsMenuVisible, setActionsMenuVisible] = useState(false);
	const [dayCompleted, setDayCompleted] = useState("INCOMPLETE");
	const [currentDate, setCurrentDate] = useState(new Date().getDate());
	const [randomTileKey, setRandomTileKey] = useState([]);
	const [addBack, setAddBack] = useState(0);
	const [gridData, setGridData] = useState(
		Array.from({ length: rows }, (_, rowIndex) =>
			Array.from({ length: columns }, (_, colIndex) => ({
				key: `${rowIndex}-${colIndex}`,
				visible: true,
			}))
		)
	);

	const gridRows = gridData.map((row, rowIndex) => (
		<View key={rowIndex} style={styles.row}>
			{row.map(({ key, visible }) => (
				<View key={key} style={[styles.gridBox, { opacity: visible ? 1 : 0 }]} />
			))}
		</View>
	));

	useEffect(() => {
		console.log("removedTiles updated:", removedTiles);
		console.log("daysLeft updated:", totalDays - removedTiles.length);
		console.log("tilesLeft updated:", tilesLeft);
		console.log("dayCompleted updated:", dayCompleted);
		console.log("gridData updated:", gridData);
	}, [removedTiles, tilesLeft, dayCompleted, gridData, totalDays]);

	useEffect(() => {
		let a = getRandomTileIndex();
		let b = getRandomTileIndex();
		if (daysLeft !== 1 || totalDays == 2) {
			while (a === b) {
				a = getRandomTileIndex();
				b = getRandomTileIndex();
			}
		}
		setRandomTileKey([a, b]);
		setCurrentDate(new Date().getDate());
		console.log(currentDate);
	}, [currentDate]); // Only re-run when the date changes

	const handlePress = () => {
		if (daysLeft === 1 && dayCompleted === "INCOMPLETE") {
			if (tilesLeft - daysLeft === 0) {
				setTilesLeft((tilesLeft) => tilesLeft - 1);
				updateGridData(randomTileKey[0]);
				setAddBack(1);
			} else {
				setTilesLeft((tilesLeft) => tilesLeft - 2);
				updateGridData(randomTileKey[0]);
				updateGridData(randomTileKey[1]);
				setAddBack(2);
			}
			setDaysLeft((daysLeft) => daysLeft - 1);
			setDayCompleted("EARNED");
		} else if (dayCompleted === "INCOMPLETE") {
			if (tilesLeft - daysLeft === 0) {
				setTilesLeft((tilesLeft) => tilesLeft - 1);
				updateGridData(randomTileKey[0]);
				setAddBack(1);
			} else {
				setTilesLeft((tilesLeft) => tilesLeft - 2);
				updateGridData(randomTileKey[0]);
				updateGridData(randomTileKey[1]);
				setAddBack(2);
			}
			setDaysLeft((daysLeft) => daysLeft - 1);
			setDayCompleted("COMPLETED");
		} else if (dayCompleted === "COMPLETED") {
			if (addBack === 1) {
				setTilesLeft((tilesLeft) => tilesLeft + 1);
				updateGridData(randomTileKey[0]);
				// addBack = 1;
			} else if (addBack === 2) {
				setTilesLeft((tilesLeft) => tilesLeft + 2);
				updateGridData(randomTileKey[0]);
				updateGridData(randomTileKey[1]);
				// addBack = 2;
			} else {
				console.log("TF");
			}
			setDaysLeft((daysLeft) => daysLeft + 1);
			setDayCompleted("INCOMPLETE");
		}
	};

	const updateGridData = (index) => {
		const updatedGridData = [...gridData];
		const [rowIndex, colIndex] = index.split("-");
		updatedGridData[rowIndex][colIndex].visible = !updatedGridData[rowIndex][colIndex].visible;
		setGridData(updatedGridData);
	};

	const getRandomTileIndex = () => {
		let randomRow = Math.floor(Math.random() * rows);
		let randomColumn = Math.floor(Math.random() * columns);
		while (gridData[randomRow][randomColumn].visible === false) {
			randomRow = Math.floor(Math.random() * rows);
			randomColumn = Math.floor(Math.random() * columns);
		}
		return `${randomRow}-${randomColumn}`;
	};

	handleLink = () => {
		if (daysLeft === 0) {
			Linking.openURL(link).catch((err) => console.error("An error occurred while opening the link:", err));
		}
	};

	return (
		<BlurView intensity={100} tint="dark" style={styles.container}>
			<View style={styles.info}>
				<TouchableOpacity style={styles.header} onPress={() => setActionsMenuVisible(true)}>
					<Text style={styles.title}>{title.toUpperCase()}</Text>
					<View style={styles.dayCounter}>
						{dayCompleted === "EARNED" ? (
							<Text style={[styles.text, { color: "#FFD700", fontSize: 16 }]}>{totalDays} Days Completed</Text>
						) : (
							<>
								<Text style={[styles.text, { color: "white" }]}>{daysLeft}</Text>
								<Text style={styles.text}>/{totalDays} Days Left</Text>
							</>
						)}
					</View>
				</TouchableOpacity>
				<TouchableOpacity style={[styles.button, { backgroundColor: dayCompleted === "COMPLETED" ? "#111111" : dayCompleted === "INCOMPLETE" ? "white" : "#FFD700" }]} onPress={handlePress}>
					<Text style={[styles.buttonText, { color: dayCompleted === "COMPLETED" ? "white" : "#111111" }]}>{dayCompleted}</Text>
				</TouchableOpacity>
			</View>
			<TouchableOpacity style={[styles.imageContainer]} onPress={handleLink}>
				<Image source={{ uri: image }} style={styles.image} />
				<View style={styles.overlay}>{gridRows}</View>
			</TouchableOpacity>
			<ActionsMenu title={title} image={image} gridRows={gridRows} data={data} setData={setData} isActionsMenuVisible={isActionsMenuVisible} setActionsMenuVisible={setActionsMenuVisible} item={item} />
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
