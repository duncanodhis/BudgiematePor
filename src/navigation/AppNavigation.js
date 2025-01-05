// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons';
// import HomeScreen from '../screens/HomeScreen';
// import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import ChatDetailScreen from '../screens/ChatDetailScreen';
// import ExploreScreen from '../screens/ExploreScreen';
// import LoginScreen from '../screens/LoginScreen';
// import SignupScreen from '../screens/SignupScreen';
// import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// import NotificationsScreen from '../screens/NotificationsScreen';
// import HomeSidebar from '../components/HomeSidebar';
// import { UserInfoProvider } from '../contexts/UserInfoContext';
// // Import the new screens
// import BasicInfoScreen from '../screens/BasicInfoScreen';
// import InterestTagsScreen from '../screens/InterestTagsScreen';
// import PreferenceScreen from '../screens/BasicInfoScreen';
// import PhotoUploadScreen from '../screens/PhotoUploadScreen';
// import FinalReviewScreen from '../screens/FinalReviewScreen';

// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

// // Custom Tab Navigator for Bottom Tabs
// const HomeTabs = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           switch (route.name) {
//             case 'Home':
//               iconName = 'heart-outline';
//               break;
//             case 'Chat':
//               iconName = 'chatbubble-ellipses-outline';
//               break;
//             case 'Explore':
//               iconName = 'compass-outline';
//               break;
//             case 'Profile':
//               iconName = 'person-outline';
//               break;
//             default:
//               iconName = 'ellipse-outline';
//           }

//           return <Icon name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#FF5A5F',  
//         tabBarInactiveTintColor: '#B0B0B0', 
//         tabBarStyle: {
//           backgroundColor: '#FFFFFF',  
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: '600',
//         },
//         headerShown: false,
//       })}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Chat" component={ChatScreen} />
//       <Tab.Screen name="Explore" component={ExploreScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// // Main App Navigation with Drawer and Sidebar
// const AppNavigation = () => {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Welcome"
//         drawerContent={(props) => <HomeSidebar {...props} />}
//         screenOptions={{
//           drawerStyle: {
//             backgroundColor: '#FFF5F7',  
//             width: 260,  
//           },
//           drawerActiveTintColor: '#FF5A5F',  
//           drawerInactiveTintColor: '#333333',  
//           drawerLabelStyle: {
//             fontSize: 16,
//             fontWeight: '600',
//           },
//           headerShown: false, 
//         }}>
//         <Drawer.Screen
//           name="Home"
//           component={HomeTabs}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="heart-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Welcome"
//           component={WelcomeScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="home-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="BasicInfo"
//           component={BasicInfoScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="person-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="InterestTags"
//           component={InterestTagsScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="checkmark-circle-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Preference"
//           component={PreferenceScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="settings-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="PhotoUpload"
//           component={PhotoUploadScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="camera-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="FinalReview"
//           component={FinalReviewScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="checkmark-done-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="log-in-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Signup"
//           component={SignupScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="person-add-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="ForgotPassword"
//           component={ForgotPasswordScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="key-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="Notifications"
//           component={NotificationsScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="notifications-outline" size={20} color={color} />,
//           }}
//         />
//         <Drawer.Screen
//           name="ChatDetail"
//           component={ChatDetailScreen}
//           options={{
//             drawerIcon: ({ color }) => <Icon name="chatbubble-outline" size={20} color={color} />,
//           }}
//         />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppNavigation;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatDetailScreen from '../screens/ChatDetailScreen';
import ExploreScreen from '../screens/ExploreScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HomeSidebar from '../components/HomeSidebar';

// Import the new screens
import BasicInfoScreen from '../screens/BasicInfoScreen';
import InterestTagsScreen from '../screens/InterestTagsScreen';
import PreferenceScreen from '../screens/PreferencesScreen';
import PhotoUploadScreen from '../screens/PhotoUploadScreen';
import FinalReviewScreen from '../screens/FinalReviewScreen';

// Import UserInfoProvider
import { UserInfoProvider } from '../contexts/UserInfoContext';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// Custom Tab Navigator for Bottom Tabs
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'heart-outline';
              break;
            case 'Chat':
              iconName = 'chatbubble-ellipses-outline';
              break;
            case 'Explore':
              iconName = 'compass-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF5A5F',  
        tabBarInactiveTintColor: '#B0B0B0', 
        tabBarStyle: {
          backgroundColor: '#FFFFFF',  
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigation with Drawer and Sidebar
const AppNavigation = () => {
  return (
    <UserInfoProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Welcome"
          drawerContent={(props) => <HomeSidebar {...props} />}
          screenOptions={{
            drawerStyle: {
              backgroundColor: '#FFF5F7',  
              width: 260,  
            },
            drawerActiveTintColor: '#FF5A5F',  
            drawerInactiveTintColor: '#333333',  
            drawerLabelStyle: {
              fontSize: 16,
              fontWeight: '600',
            },
            headerShown: false, 
          }}>
          <Drawer.Screen
            name="Home"
            component={HomeTabs}
            options={{
              drawerIcon: ({ color }) => <Icon name="heart-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="home-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="BasicInfo"
            component={BasicInfoScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="person-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="InterestTags"
            component={InterestTagsScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="checkmark-circle-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Preference"
            component={PreferenceScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="settings-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="PhotoUpload"
            component={PhotoUploadScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="camera-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="FinalReview"
            component={FinalReviewScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="checkmark-done-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="log-in-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Signup"
            component={SignupScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="person-add-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="key-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="Notifications"
            component={NotificationsScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="notifications-outline" size={20} color={color} />,
            }}
          />
          <Drawer.Screen
            name="ChatDetail"
            component={ChatDetailScreen}
            options={{
              drawerIcon: ({ color }) => <Icon name="chatbubble-outline" size={20} color={color} />,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </UserInfoProvider>
  );
};

export default AppNavigation;
