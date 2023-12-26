import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Module from "./components/Module";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ERN-IT</Text>
			{/* <LinearGradient colors={["#000000", "#121212", "#232323"]} style={styles.gradient}> */}
			{/* <ImageBackground source={require("./assets/pattern3.png")} resizeMode="cover" style={styles.image}> */}
			<StatusBar style="auto" />

			{/* </ImageBackground> */}
			{/* </LinearGradient> */}
			<Module days={16} title={"Guitar"} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e1e1e",
		// backgroundColor: "linear-gradient(to bottom, #000000, #808080)",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 50,
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		fontFamily: "Roboto",
		letterSpacing: 2,
		color: "white",
	},
});
