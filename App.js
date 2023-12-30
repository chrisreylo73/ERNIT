import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Module from "./components/Module";
import { AntDesign } from "@expo/vector-icons";

export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>ERN-IT</Text>
			<View style={styles.separator} />
			<Module totalDays={21} title={"Guitar"} image={require("./assets/Forte-Port-Nylon-HO.png")} />
			<Module totalDays={15} title={"Basketball"} image={require("./assets/J12.png")} />
			<Module totalDays={21} title={"Leet Code"} image={require("./assets/nirvana.jpg")} />
			<TouchableOpacity style={styles.button}>
				<AntDesign name="plus" size={24} color="white" />
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#111111",
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		position: "absolute",
		top: 0,
		marginTop: 50,
		fontSize: 20,
		fontWeight: "bold",
		fontFamily: "Roboto",
		letterSpacing: 4,
		color: "white",
	},
	button: {
		position: "absolute",
		bottom: 20,
		marginTop: 10,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
		padding: 10,
		width: "90%",
		borderRadius: 20,
		// height: 50,
		// elevation: 20,
		borderWidth: 1,
		// borderColor: "#f0f0f0",
	},
	separator: {
		position: "absolute",
		height: 1, // Height of the separator
		width: "90%",
		backgroundColor: "white", // Color of the separator
		top: 100,
	},
});
