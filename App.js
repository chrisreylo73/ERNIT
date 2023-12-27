import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Module from "./components/Module";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ERN-IT</Text>
			<StatusBar style="auto" />
			<Module days={16} title={"Guitar"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#111111",
		// backgroundColor: "linear-gradient(to bottom, #000000, #808080)",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 50,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
	},
});
