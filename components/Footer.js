import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Ripple from "react-native-material-ripple";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
const Footer = ({ setAddMenuVisible }) => {
	return (
		<BlurView style={styles.footer} intensity={100} tint="dark">
			<View style={styles.separator} />
			<Ripple rippleColor="#fff" rippleopacity={0.87} rippleDuration={2400} style={styles.button} onPress={() => setAddMenuVisible(true)}>
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
		bottom: 0, // backgroundColor: "#111111",
		height: "7%",
		// marginTop: 5,
		elevation: 10,
	},
	separator: {
		height: 1,
		backgroundColor: "#080808",
		//backgroundColor: "#49528f",
		width: "100%",
	},
	button: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "black",
		width: "100%",
		hight: "100%",
		padding: 15,
		borderRadius: 20,
		//elevation: 10,
		// marginBottom: 10,
		//borderWidth: 1,
	},
});
