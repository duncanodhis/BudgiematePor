import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { MotiView, AnimatePresence } from 'moti';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 64) / 2; // Adjusted for better spacing
const GRID_GAP = 16;

const PhotoUpload = ({ photos, onPhotosUpdate, maxPhotos = 6 }) => {
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const draggedValue = useRef(new Animated.ValueXY()).current;

  const pickImage = async () => {
    if (photos.length >= maxPhotos) {
      Toast.show({
        type: 'info',
        text1: 'Maximum photos reached',
        text2: `You can upload up to ${maxPhotos} photos`,
        position: 'bottom',
      });
      return;
    }

    try {
      setUploading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4], // Changed to square aspect ratio
        quality: 0.8,
        allowsMultipleSelection: true,
        maxSelected: maxPhotos - photos.length,
      });

      if (!result.canceled && result.assets) {
        const newPhotos = result.assets.map(asset => asset.uri);
        // Ensure we're not exceeding maxPhotos
        const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
        onPhotosUpdate(updatedPhotos);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error uploading photo',
        text2: 'Please try again',
        position: 'bottom',
      });
    } finally {
      setUploading(false);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...photos];
    newPhotos.splice(index, 1);
    onPhotosUpdate(newPhotos);
    
    Toast.show({
      type: 'success',
      text1: 'Photo removed',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: draggedValue.x, translationY: draggedValue.y } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event, index) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setDraggingIndex(null);
      draggedValue.setValue({ x: 0, y: 0 });
    } else if (event.nativeEvent.state === State.BEGAN) {
      setDraggingIndex(index);
    }
  };

  const renderPhoto = (photo, index) => {
    const isBeingDragged = index === draggingIndex;
    const transform = isBeingDragged
      ? draggedValue.getTranslateTransform()
      : [];

    return (
      <MotiView
        key={photo}
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'timing', duration: 300, delay: index * 100 }}
        style={styles.photoWrapper}
      >
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={(event) => onHandlerStateChange(event, index)}
        >
          <Animated.View style={[styles.photoItem, { transform }]}>
            <Image 
              source={{ uri: photo }} 
              style={styles.photo} 
              defaultSource={require('../../assets/images/user1.jpg')} // Add a placeholder image
            resizeMode="cover"

            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePhoto(index)}
            >
              <FontAwesome5 name="times-circle" size={24} color="#FF6B6B" solid />
            </TouchableOpacity>
            <View style={styles.orderBadge}>
              <Text style={styles.orderText}>{index + 1}</Text>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </MotiView>
    );
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 1000 }}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Your Photos</Text>
        <Text style={styles.subtitle}>
          {photos.length}/{maxPhotos} photos uploaded
        </Text>
      </View>

      <View style={styles.photoGrid}>
        <AnimatePresence>
          {photos.map((photo, index) => renderPhoto(photo, index))}
        </AnimatePresence>

        {photos.length < maxPhotos && (
          <MotiView
            from={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', delay: photos.length * 100 }}
            style={styles.photoWrapper}
          >
            <TouchableOpacity
              style={styles.addButton}
              onPress={pickImage}
              disabled={uploading}
            >
              {uploading ? (
                <MotiView
                  from={{ rotate: '0deg' }}
                  animate={{ rotate: '360deg' }}
                  transition={{ type: 'timing', duration: 1000, loop: true }}
                >
                  <FontAwesome5 name="spinner" size={32} color="#FF6B6B" />
                </MotiView>
              ) : (
                <>
                  <FontAwesome5 name="plus-circle" size={32} color="#FF6B6B" />
                  <Text style={styles.addButtonText}>Add Photos</Text>
                  <Text style={styles.addButtonSubtext}>
                    Tap to upload • Drag to reorder
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </MotiView>
        )}
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -GRID_GAP / 2,
    marginTop: -GRID_GAP / 2,
  },
  photoWrapper: {
    width: '50%',
    padding: GRID_GAP / 2,
  },
  photoItem: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F8F9FA',
  },
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  addButtonText: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  addButtonSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PhotoUpload;