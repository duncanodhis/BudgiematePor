import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const PhotosScreen = ({ navigation, photos, setPhotos, handleSaveProfile }) => {
  const handlePhotoUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setPhotos([...photos, result.uri]);
    }
  };

  return (
    <View style={styles.page}>
      <Text style={styles.sectionTitle}>Photos</Text>
      <View style={styles.photosContainer}>
        {photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
        {photos.length < 6 && (
          <TouchableOpacity style={styles.addPhotoButton} onPress={handlePhotoUpload}>
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    page: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: '#333',
    },
    photosContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
    },
    photo: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    addPhotoButton: {
      width: 100,
      height: 100,
      backgroundColor: '#E0E0E0',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    addPhotoText: {
      color: '#333',
      fontSize: 16,
      fontWeight: 'bold',
    },
    saveButton: {
      backgroundColor: '#4CAF50',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  

export default PhotosScreen;
