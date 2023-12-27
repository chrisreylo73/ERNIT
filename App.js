import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Module from "./components/Module";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ERN-IT</Text>
			<View style={styles.separator} />

			<Module days={100} title={"Guitar"} image={require("./assets/Forte-Port-Nylon-HO.png")} />
			<Module days={15} title={"Basketball"} image={require("./assets/J12.png")} />
			<Module days={21} title={"Leet Code"} image={require("./assets/nirvana.jpg")} />
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>+</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#111111",
		// backgroundColor: "white",
		// backgroundColor: "linear-gradient(to bottom, #000000, #808080)",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		position: "absolute",
		top: 0,
		marginTop: 50,
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20,
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
	},
	button: {
		position: "absolute",
		bottom: 0,
		marginTop: 10,
		backgroundColor: "black",
		height: "40px",
		padding: 10,
		borderTopLeftRadius: 70,
		borderTopRightRadius: 70,
		width: "100%",
		height: 40,
		elevation: 20,
		borderWidth: 1,
		// borderColor: "#f0f0f0",
	},
	separator: {
		height: 1, // Height of the separator
		width: "90%",
		backgroundColor: "#ddd", // Color of the separator
		marginBottom: 20,
	},
});
