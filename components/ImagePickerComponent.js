import React, { useState, useEffect } from "react";
import { View, Image, Button } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		(async () => {
			// Request permission to access the device's photo gallery
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				console.error("Permission to access gallery was denied");
			}
		})();
	}, []);

	const pickImage = async () => {
		try {
			// Open the image picker
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.canceled) {
				// Set the selected image URI
				setSelectedImage(result.uri);
			}
		} catch (error) {
			console.error("Error picking an image", error);
		}
	};

	return (
		<View>
			{selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
			<Button title="SELECT IMAGE" onPress={pickImage} />
		</View>
	);
};

export default ImagePickerComponent;
