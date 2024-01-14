import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErnitModule from "./components/ErnitModule";
import AddMenu from "./components/AddMenu";

export default function App() {
	const [isModalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState([]);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Header />
			<View style={styles.list}>
				<FlatList contentContainerStyle={{ paddingBottom: 60, paddingTop: 85 }} showsVerticalScrollIndicator={false} data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ErnitModule totalDays={item.totalDays} title={item.title} image={item.image} link={item.link} accentColor={item.accentColor} />} />
			</View>
			<Footer setModalVisible={setModalVisible} />
			<AddMenu data={data} setData={setData} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
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
	list: {
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 0,
		marginBottom: 0,
	},
});

// try {
// 	await AsyncStorage.clear();
// 	console.log("AsyncStorage cleared successfully");
// } catch (error) {
// 	console.error("Error clearing AsyncStorage:", error);
// }
//accentColor: "rgba(170, 216, 92, 0.6)}"
//accentColor: "rgba(255, 0, 0, 0.6)"
//accentColor: "rgba(128, 0, 128, 0.6)"
//accentColor: "rgba(150, 216, 250, 0.6)"
