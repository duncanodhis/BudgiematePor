// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { useNavigation } from '@react-navigation/native';

// const HomeSidebar = () => {
//   const navigation = useNavigation();

//   const handleLogout = () => {
//     Alert.alert(
//       "Log Out",
//       "Are you sure you want to log out?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel"
//         },
//         { text: "Log Out", onPress: () => navigation.replace("login") }
//       ],
//       { cancelable: false }
//     );
//   };

//   const handleNotificationPress = () => {
//     navigation.navigate('notifications');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPress}>
//         <Icon name="notifications-outline" size={25} color="#3B5998" />
//         <Text style={styles.menuText}>Notifications</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
//         <Icon name="log-out-outline" size={25} color="#3B5998" />
//         <Text style={styles.menuText}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 15,
//   },
//   menuText: {
//     marginLeft: 10,
//     fontSize: 16,
//     color: '#3B5998',
//   },
// });

// export default HomeSidebar;
import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const HomeSidebar = () => {
  const navigation = useNavigation();
  
  // Placeholder user data - in real app, this would come from your auth/user context
  const user = {
    name: "John Doe",
    photo: null // Assuming no photo initially
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "Log Out", onPress: () => navigation.replace("login") }
      ],
      { cancelable: false }
    );
  };

  const handleNotificationPress = () => {
    navigation.navigate('notifications');
  };

  const handleEditProfile = () => {
    navigation.navigate('profile');
  };

  const handleSettings = () => {
    navigation.navigate('settings');
  };

  return (
    <View style={styles.container}>
      {/* Profile Section */}
      <TouchableOpacity style={styles.profileSection} onPress={handleEditProfile}>
        <View style={styles.avatarContainer}>
          {user.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={40} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPress}>
          <Icon name="notifications-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <Icon name="settings-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="log-out-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: {
    marginBottom: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#3B5998',
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#3B5998',
  },
});

export default HomeSidebar;