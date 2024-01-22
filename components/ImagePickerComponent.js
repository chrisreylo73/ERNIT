// Import necessary modules and components
import { useEffect } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Define the ImagePickerComponent functional component
const ImagePickerComponent = ({ rewardImage, setRewardImage }) => {
	// Use effect to request media library permissions when the component mounts
	useEffect(() => {
		(async () => {
			// Request permission to access the media library
			const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				console.error("Permission to access gallery was denied");
			}
		})();
	}, []);

	// Function to pick an image from the gallery
	const pickImage = async () => {
		try {
			// Launch the image picker with specified options
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
			});

			// If an image is selected, update the reward image state
			if (!result.canceled) {
				const selectedImageUri = result.assets[0].uri;
				setRewardImage(selectedImageUri);
			}
		} catch (error) {
			console.error("Error picking an image", error);
		}
	};

	// Render the ImagePickerComponent
	return (
		<View>
			{/* Display the selected reward image if available */}
			{rewardImage && <Image style={styles.image} source={{ uri: rewardImage }} />}
			{/* Button to trigger the image picker */}
			<TouchableOpacity onPress={pickImage} style={styles.button}>
				<Text style={styles.buttonText}>SELECT IMAGE</Text>
			</TouchableOpacity>
		</View>
	);
};

// Export the ImagePickerComponent
export default ImagePickerComponent;

// Styles for the component
const styles = StyleSheet.create({
	image: {
		borderRadius: 20,
		overflow: "hidden",
		width: 160,
		height: 160,
		marginBottom: 10,
		marginTop: 5,
	},
	button: {
		backgroundColor: "#111111",
		borderColor: "#2b2b2b",
		borderWidth: 1,
		padding: 8,
		borderRadius: 5,
		width: 160,
		height: 40,
	},
	buttonText: {
		textAlign: "center",
		flex: 1,
		color: "#4a4a4e",
		fontSize: 16,
		justifyContent: "center",
		alignItems: "center",
		fontWeight: "bold",
	},
});
