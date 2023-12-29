# SETUP

-   `npx create-expo-app@latest --example with-router`
-   `npm install -g expo-cli`

# RUN

-   `expo-cli start --tunnel`
-   Scan QRCode in Expo App

# RESOURCES

-   https://icons.expo.fyi/Index

# VOCAB

-   **View**:
    -   The fundamental building block for creating user interfaces. It's like a `<div>` in web development and is used to structure and group other components.
-   **SafeAreaView**:

    -   A specialized component introduced to handle the safe area insets on modern smartphones with notches (e.g., iPhone X and newer). It automatically adjusts the content inside it to avoid overlapping with the safe area insets, such as the status bar, notch, and home indicator on iOS devices. It ensures a better user experience by preventing UI elements from being hidden behind these system elements. Use it when you want to handle safe area insets automatically.

-   **Text**:

    -   Used for displaying text in your app. You can style it using CSS-like properties.

-   **Image**:

    -   Displays images in your app. You can load images from local resources or from remote URLs.

-   **TextInput**:

    -   Allows users to input text. You can use it for things like text fields, search bars, and more.

-   **ScrollView**:

    -   Provides a scrollable view for your content. It's useful when you have a lot of content to display that can't fit on a single screen.

-   **FlatList and SectionList**:

    -   These components are used for rendering lists of data efficiently. They support lazy loading and recycling of list items, making them suitable for long lists.

-   **Button**:

    -   A simple button component for user interactions, which can trigger actions or functions.

-   **Touchable components** (TouchableOpacity, TouchableHighlight, TouchableNativeFeedback, TouchableWithoutFeedback):

    -   These components are used to make elements respond to touch gestures, such as taps and long presses. They provide feedback to the user when pressed.

-   **ActivityIndicator**:

    -   Displays an activity indicator or loading spinner to indicate that some operation is in progress.

-   **Modal**:

    -   Used for creating overlaying pop-up windows or modals. They are often used for dialogs or additional user interactions.

-   **Picker**:

    -   Provides a dropdown menu for selecting items from a list. It can be customized to display various types of data.

-   **Switch**:

    -   A toggle switch component that can be used for binary choices, like turning settings on or off.

-   **StatusBar**:

    -   Allows you to control the status bar's appearance, such as its background color and text color.

-   **WebView**:

    -   Renders web content within your app. It can display web pages or web-based content.

-   **Navigation components** (StackNavigator, TabNavigator, DrawerNavigator, etc.):

    -   Used for creating navigation structures in your app. These components help with organizing and navigating between different screens and sections of your app.

-   **Animated**:

    -   A set of components for creating animations and transitions in your app. You can animate properties like position, scale, opacity, and more.

-   **GestureResponder system**:

    -   This system provides touch and gesture handling capabilities, allowing you to capture and respond to complex touch interactions.

-   **CameraRoll** and **Camera** components:
    -   Used for accessing and capturing images and videos from the device's camera and photo library.
