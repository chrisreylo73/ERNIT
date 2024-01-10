import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
const Footer = ({ setModalVisible }) => {
	return (
		<BlurView
			style={styles.footer}
			intensity={80} // Adjust the intensity to control the blur effect
			tint="dark" // Change to "light" for a lighter blur effect
		>
			<View style={styles.separator} />
			<Ripple rippleContainerBorderRadius={100} rippleColor="#fff" style={styles.button} onPress={() => setModalVisible(true)}>
				<AntDesign name="plus" size={24} color="white" />
			</Ripple>
		</BlurView>
	);
};

export default Footer;

const styles = StyleSheet.create({
	footer: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "space-between",
		left: 0,
		right: 0,
		zIndex: 10,
		bottom: 0,
		//backgroundColor: "black",
		// backgroundColor: "#111111",
		//backgroundColor: "#2d3460",
		height: "8%",
		// marginTop: 5,
	},
	separator: {
		height: 1,
		backgroundColor: "#080808",
		//backgroundColor: "#49528f",
		width: "94%",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "black",
		width: "100%",
		hight: "100%",
		padding: 12,
		borderRadius: 20,
		marginBottom: 10,
		//borderWidth: 1,
	},
});
