import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

const Header = () => {
	return (
		<BlurView
			style={styles.header}
			intensity={80} // Adjust the intensity to control the blur effect
			tint="dark" // Change to "light" for a lighter blur effect
		>
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
		alignItems: "center",
		//justifyContent: "space-between",
		// marginBottom: 200,
		backgroundColor: "transparent",
		// height: "10%",
		borderBottomLeftRadius: 50,
		top: 0,
		// left: 0,
		// right: 0,
		zIndex: 2,
		elevation: 10,
	},
	// blurView: { position: "fixed", width: "100%", height: "100%" },

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
		backgroundColor: "#080808",
		//backgroundColor: "#49528f",
		width: "100%",
	},
});
