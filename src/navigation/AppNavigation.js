
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; // Import Drawer
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen.js';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import ExploreScreen from '../screens/ExploreScreen.js';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HomeSidebar from '../components/HomeSidebar'; // Import Sidebar
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator(); // Create Drawer Navigator

// Bottom Tabs for Home
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'heart-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'Explore') {
            iconName = 'compass-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3B5998',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // Remove the top bar
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Drawer Navigator with Sidebar
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="home"
        drawerContent={(props) => <HomeSidebar {...props} />} // Use Sidebar as Drawer Content
        screenOptions={{
          headerShown: false, // Remove the top bar
        }}
      >
        <Drawer.Screen name="home" component={HomeTabs} />
        <Drawer.Screen name="welcome" component={WelcomeScreen} />
        <Drawer.Screen name="login" component={LoginScreen} />
        <Drawer.Screen name="signup" component={SignupScreen} />
        <Drawer.Screen name="forgotpassword" component={ForgotPasswordScreen} />
        <Drawer.Screen name="notifications" component={NotificationsScreen} />
        <Drawer.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{ presentation: 'modal', headerShown: false }} // No top bar
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
