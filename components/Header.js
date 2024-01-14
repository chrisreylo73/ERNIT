import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const Header = () => {
	return (
		<BlurView style={styles.header} intensity={100} tint="dark">
			<View>
				<Text style={styles.title}>ERN-IT</Text>
			</View>
			<View style={styles.separator} />
		</BlurView>
	);
};

export default Header;

const styles = StyleSheet.create({
	header: {
		position: "absolute",
		width: "100%",
		borderRadius: 100,
		alignItems: "center",
		top: 0,
		zIndex: 2,
	},
	title: {
		marginTop: 40,
		textAlign: "center",
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
		marginBottom: 10,
	},
	separator: {
		height: 1,
		backgroundColor: "black",
		width: "100%",
	},
});
