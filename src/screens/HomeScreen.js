// import React from "react";
// import { View, StyleSheet, SafeAreaView } from "react-native";
// import { userData } from "./index"; // Adjust the path to your data file
// import SwipeCard from "../components/SwipeCard"; // Adjust the path to the component

// const HomeScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.cardContainer}>
//         <SwipeCard data={userData} />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f0f0f0",
//   },
//   cardContainer: {
//     flex: 1,
//     // Add padding to ensure content doesn't touch the edges
//     paddingHorizontal: 10,
//     paddingTop: 10,
//     paddingBottom: 20,
//   },
// });

// export default HomeScreen;
import React from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { userData } from "./index"; // Adjust the path to your data file
import SwipeCard from "../components/SwipeCard"; // Adjust the path to the component
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer(); // Opens the sidebar (drawer)
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hamburger Icon to open the Sidebar */}
      <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
        <Icon name="menu" size={30} color="#3B5998" />
      </TouchableOpacity>

      <View style={styles.cardContainer}>
        <SwipeCard data={userData} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 20,
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1, // Ensures the button is above other components
  },
});

export default HomeScreen;
