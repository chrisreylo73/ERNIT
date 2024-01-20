import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErnitModule from "./components/ErnitModule";
import AddMenu from "./components/AddMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	const [isAddMenuVisible, setAddMenuVisible] = useState(false);
	const [data, setData] = useState([]);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const storedModules = await AsyncStorage.getItem("modules");
			if (storedModules) {
				const parsedModules = JSON.parse(storedModules);
				setData(parsedModules);
			}
			console.log("\n\n LOADED DATA: \n\n", data);
		} catch (error) {
			console.error("Error loading tasks:", error);
		}
	};

	const updateModule = async (moduleToUpdate) => {
		const updatedModules = data.map((module) => (module.id === moduleToUpdate.id ? moduleToUpdate : module));
		setData(updatedModules);
		await AsyncStorage.setItem("modules", JSON.stringify(updatedModules));
	};

	const deleteModule = async (moduleToDeleteID) => {
		console.log("\n\n DELETE DATA: \n\n");
		const updatedData = data.filter((module) => module.id !== moduleToDeleteID);
		setData(updatedData);
		try {
			await AsyncStorage.setItem("modules", JSON.stringify(updatedData));
		} catch (error) {
			console.error("Error updating AsyncStorage:", error);
		}
		console.log(data);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" translucent={true} />
			<Header />
			<View style={styles.list}>
				<FlatList contentContainerStyle={{ paddingBottom: 60, paddingTop: 85 }} showsVerticalScrollIndicator={false} data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ErnitModule item={item} data={data} setData={setData} onUpdate={updateModule} onDelete={deleteModule} />} />
			</View>
			<Footer setAddMenuVisible={setAddMenuVisible} />
			<AddMenu data={data} setData={setData} isAddMenuVisible={isAddMenuVisible} setAddMenuVisible={setAddMenuVisible} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		// marginTop: 20,
		flex: 1,
		backgroundColor: "#111111",
		alignItems: "center",
		justifyContent: "center",
	},
	list: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		marginBottom: 0,
	},
});
