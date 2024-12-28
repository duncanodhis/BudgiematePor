import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const PhotoUpload = ({ photos, onPhotosUpdate, maxPhotos }) => {
  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Toast.show({
        type: 'info',
        text1: 'Maximum photos reached',
        text2: `You can only upload up to ${maxPhotos} photos`,
      });
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      onPhotosUpdate([...photos, result.assets[0].uri]);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosUpdate(newPhotos);
  };

  return (
    <View style={styles.photoContainer}>
      <ScrollView contentContainerStyle={styles.photoWrapper}>
        <View style={styles.photoGrid}>
          {photos.map((photo, index) => (
            <View key={index} style={styles.photoItem}>
              <Image source={{ uri: photo }} style={styles.photo} />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePhoto(index)}
              >
                <Ionicons name="close-circle" size={24} color="#3B5998" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {photos.length < maxPhotos && (
          <TouchableOpacity style={styles.addButton} onPress={pickImage}>
            <Ionicons name="add-circle" size={40} color="#3B5998" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    marginVertical: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  photoWrapper: {
    flexDirection: 'column',  // Stack items vertically
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Add space between items
    marginBottom: 16, // Increased margin bottom for spacing
  },
  photoItem: {
    marginBottom: 20, // Increased bottom margin to add more space between rows
    marginRight: 16, // Increased right margin to add space between columns
    position: 'relative',
    width: 120, // Slightly increased width to give more space
    height: 120, // Slightly increased height to give more space
  },
  photo: {
    width: 120, // Adjusted width for better spacing
    height: 120, // Adjusted height for better spacing
    borderRadius: 8,
    resizeMode: 'cover',
  },
removeButton: {
  position: 'absolute',
  top: -5,
  right: -5,
  backgroundColor: '#fff',
  borderRadius: 12,
},
  addButton: {
    width: 120, // Adjusted to match the photo size
    height: 120, // Adjusted to match the photo size
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#3B5998',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16, // Increased top margin for spacing
  },
});

export default PhotoUpload;
