import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ rewardImage, setRewardImage }) => {
	useEffect(() => {
		(async () => {
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				console.error("Permission to access gallery was denied");
			}
		})();
	}, []);

	const pickImage = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
			});
			console.log(result);

			if (!result.canceled) {
				const selectedImageUri = result.assets[0].uri;
				setRewardImage(selectedImageUri);
				console.log(selectedImageUri);
			}
		} catch (error) {
			console.error("Error picking an image", error);
		}
	};

	return (
		<View>
			{rewardImage && <Image style={styles.image} source={{ uri: rewardImage }} />}
			<TouchableOpacity onPress={pickImage} style={styles.button}>
				<Text style={styles.buttonText}>SELECT IMAGE</Text>
			</TouchableOpacity>
		</View>
	);
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
	image: {
		borderRadius: 20,
		overflow: "hidden",
		width: 160,
		height: 160,
		marginBottom: 10,
	},
	button: {
		color: "white",
		backgroundColor: "#111111",
		borderColor: "#4a4a4e",
		borderWidth: 1,
		padding: 6,
		alignSelf: "center",
		borderRadius: 5,
		width: 140,
		height: 35,
	},
	buttonText: {
		textAlign: "center",
		flex: 1,
		color: "white",
		fontSize: 16,
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
});
