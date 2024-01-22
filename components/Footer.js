// Import necessary modules and components
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

// Define the Footer functional component
const Footer = ({ setAddMenuVisible }) => {
	// Render the Footer component
	return (
		<BlurView style={styles.footer} intensity={100} tint="dark">
			{/* View for separator line */}
			<View style={styles.separator} />
			{/* Ripple button to trigger the Add Menu visibility */}
			<Ripple rippleColor="#fff" rippleopacity={0.87} rippleDuration={2400} style={styles.button} onPress={() => setAddMenuVisible(true)}>
				{/* Plus icon inside the button */}
				<AntDesign name="plus" size={24} color="white" />
			</Ripple>
		</BlurView>
	);
};

// Export the Footer component
export default Footer;

// Styles for the component
const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-between",
		left: 0,
		right: 0,
		zIndex: 10,
		bottom: 0,
		height: "7%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 2,
	},
	separator: {
		height: 1,
		backgroundColor: "#111111",
		width: "100%",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		hight: "100%",
		padding: 15,
		borderRadius: 20,
	},
});
