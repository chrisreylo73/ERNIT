// Import necessary modules and components
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BlurView } from "expo-blur";

// Define the Header functional component
const Header = () => {
	// Render the Header component
	return (
		<BlurView style={styles.header} intensity={100} tint="dark">
			{/* View containing the title */}
			<View>
				{/* Text displaying the title */}
				<Text style={styles.title}>ERN-IT</Text>
			</View>
			{/* View for separator line */}
			<View style={styles.separator} />
		</BlurView>
	);
};

// Export the Header component
export default Header;

// Styles for the component
const styles = StyleSheet.create({
	header: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
		top: 0,
		zIndex: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		elevation: 8,
	},
	title: {
		marginTop: 35,
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
		backgroundColor: "#111111",
		width: "100%",
	},
});
