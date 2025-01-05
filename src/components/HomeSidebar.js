import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import {user} from '../services/AuthService';
import {getUserProfile} from '../services/ProfileService';
const HomeSidebar = () => {
  const navigation = useNavigation();

  const user = {
    name: " Chris T",
    age: 28,
    location: "New York, USA",
    bio: "Adventurer, foodie, and always up for a good conversation.",
    photo: null, // Replace with actual photo URI if available
    stats: {
      likes: 150,
      matches: 45,
      views: 320,
    },
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Log Out", onPress: () => navigation.replace("login") },
      ],
      { cancelable: false }
    );
  };

  const handleNotificationPress = () => navigation.navigate("notifications");
  const handleMessagesPress = () => navigation.navigate("messages");
  const handleMatchesPress = () => navigation.navigate("matches");
  const handleUpgradePress = () => Alert.alert("Upgrade to Premium", "Premium features coming soon!");
  const handleEditProfile = () => navigation.navigate("profile");
  const handleSettings = () => navigation.navigate("settings");

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          {user.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatar} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Icon name="person" size={40} color="#FFFFFF" />
            </View>
          )}
        </View>
        <Text style={styles.userName}>{user.name}, {user.age}</Text>
        <Text style={styles.userLocation}>{user.location}</Text>
        <Text style={styles.userBio}>{user.bio}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Statistics Section */}
      <View style={styles.statsSection}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.likes}</Text>
          <Text style={styles.statLabel}>Likes Received</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.matches}</Text>
          <Text style={styles.statLabel}>Matches</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user.stats.views}</Text>
          <Text style={styles.statLabel}>Profile Views</Text>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPress}>
          <Icon name="notifications-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleMessagesPress}>
          <Icon name="chatbubbles-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Messages</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleMatchesPress}>
          <Icon name="heart-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Matches</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
          <Icon name="settings-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleUpgradePress}>
          <Icon name="star-outline" size={25} color="#FFD700" />
          <Text style={styles.menuText}>Upgrade to Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
          <Icon name="log-out-outline" size={25} color="#3B5998" />
          <Text style={styles.menuText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Safety Tips Section */}
      <View style={styles.tipsSection}>
        <Text style={styles.tipsHeader}>Safety Tips</Text>
        <Text style={styles.tip}>• Never share financial information.</Text>
        <Text style={styles.tip}>• Meet in public places.</Text>
        <Text style={styles.tip}>• Inform a friend about your plans.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  avatarContainer: { marginBottom: 10 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  userLocation: { fontSize: 14, color: '#777777' },
  userBio: { fontSize: 14, color: '#555555', textAlign: 'center', marginVertical: 10 },
  editButton: { paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20, backgroundColor: '#3B5998' },
  editButtonText: { color: '#FFFFFF', fontSize: 14 },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#333333' },
  statLabel: { fontSize: 14, color: '#777777' },
  menuContainer: { padding: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15 },
  menuText: { marginLeft: 10, fontSize: 16, color: '#3B5998' },
  tipsSection: { padding: 20, borderTopWidth: 1, borderTopColor: '#EEEEEE' },
  tipsHeader: { fontSize: 16, fontWeight: 'bold', color: '#333333', marginBottom: 10 },
  tip: { fontSize: 14, color: '#555555', marginBottom: 5 },
});

export default HomeSidebar;
