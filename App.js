// Import necessary components and modules
import { useState, useEffect } from "react";
import { StyleSheet, View, FlatList, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErnitModule from "./components/ErnitModule";
import AddMenu from "./components/AddMenu";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define the main App component
export default function App() {
	// State variables for controlling the visibility of the add menu and storing data
	const [isAddMenuVisible, setAddMenuVisible] = useState(false);
	const [data, setData] = useState([]);

	// useEffect to load data when the component mounts
	useEffect(() => {
		loadData();
	}, []);

	// Function to load data from AsyncStorage
	const loadData = async () => {
		try {
			// Retrieve stored modules from AsyncStorage
			const storedModules = await AsyncStorage.getItem("modules");
			if (storedModules) {
				// Parse and set the retrieved modules
				const parsedModules = JSON.parse(storedModules);
				setData(parsedModules);
			}
			console.log("\n\n LOADED DATA: \n\n", data);
		} catch (error) {
			console.error("Error loading tasks:", error);
		}
	};

	// Function to update a module in the data and AsyncStorage
	const updateModule = async (moduleToUpdate) => {
		const updatedModules = data.map((module) => (module.id === moduleToUpdate.id ? moduleToUpdate : module));
		setData(updatedModules);
		await AsyncStorage.setItem("modules", JSON.stringify(updatedModules));
	};

	// Function to delete a module from the data and AsyncStorage
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

	// Render the main structure of the app
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" translucent={true} />
			<Header />
			<View style={styles.list}>
				{/* FlatList to display the modules */}
				<FlatList
					contentContainerStyle={{ paddingBottom: 70, paddingTop: 85 }}
					showsVerticalScrollIndicator={false}
					data={data}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						// Render each module using the ErnitModule component
						<ErnitModule item={item} data={data} setData={setData} onUpdate={updateModule} onDelete={deleteModule} />
					)}
				/>
			</View>
			{/* Footer and AddMenu components */}
			<Footer setAddMenuVisible={setAddMenuVisible} />
			<AddMenu data={data} setData={setData} isAddMenuVisible={isAddMenuVisible} setAddMenuVisible={setAddMenuVisible} />
		</SafeAreaView>
	);
}

// Styles for the components
const styles = StyleSheet.create({
	container: {
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
