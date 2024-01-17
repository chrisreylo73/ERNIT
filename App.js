import { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ErnitModule from "./components/ErnitModule";
import AddMenu from "./components/AddMenu";

export default function App() {
	const [isAddMenuVisible, setAddMenuVisible] = useState(false);
	const [data, setData] = useState([]);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Header />
			<View style={styles.list}>
				<FlatList contentContainerStyle={{ paddingBottom: 60, paddingTop: 85 }} showsVerticalScrollIndicator={false} data={data} keyExtractor={(item) => item.id} renderItem={({ item }) => <ErnitModule item={item} data={data} setData={setData} />} />
			</View>
			<Footer setAddMenuVisible={setAddMenuVisible} />
			<AddMenu data={data} setData={setData} isAddMenuVisible={isAddMenuVisible} setAddMenuVisible={setAddMenuVisible} />
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
