// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Text,
//   Dimensions,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import { MotiView, AnimatePresence } from 'moti';
// import { FontAwesome5 } from '@expo/vector-icons';
// import Toast from 'react-native-toast-message';
// import { useNavigation } from '@react-navigation/native';
// import { useUserInfo } from '../contexts/UserInfoContext';
// import { useAuth } from '../contexts/AuthContext';
// import { updatedPhotos } from '../services/ProfileService';
// const { width } = Dimensions.get('window');
// const GRID_GAP = 16;

// const PhotosScreen = () => {
//   const [photos, setPhotos] = useState([]);
//   const [draggingIndex, setDraggingIndex] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const draggedValue = useRef(new Animated.ValueXY()).current;
//   const navigation = useNavigation();
//   const { userInfo, setUserInfo } = useUserInfo();
//   const { user } = useAuth();

//   const maxPhotos = 6;

//   const handleNext = () => {
//     setUserInfo({
//       ...userInfo,
//       photos: photos,
//     });
//     navigation.navigate('InterestTags');
//   };

//   const pickImage = async () => {
//     if (photos.length >= maxPhotos) {
//       Toast.show({
//         type: 'info',
//         text1: 'Maximum photos reached',
//         text2: `You can upload up to ${maxPhotos} photos`,
//         position: 'bottom',
//       });
//       return;
//     }
  
//     try {
//       setUploading(true);
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: false,
//         aspect: [4, 4],
//         quality: 0.8,
//         allowsMultipleSelection: true,
//         maxSelected: maxPhotos - photos.length,
//       });
  
//       if (!result.canceled && result.assets) {
//         const newPhotos = result.assets.map(asset => asset.uri);
//         const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
//         setPhotos(updatedPhotos);
//       }
//     } catch (error) {
//       Toast.show({
//         type: 'error',
//         text1: 'Error uploading photo',
//         text2: 'Please try again',
//         position: 'bottom',
//       });
//     } finally {
//       setUploading(false);
//     }
//   };

//   const removePhoto = (index) => {
//     const newPhotos = [...photos];
//     newPhotos.splice(index, 1);
//     setPhotos(newPhotos);
    
//     Toast.show({
//       type: 'success',
//       text1: 'Photo removed',
//       position: 'bottom',
//       visibilityTime: 2000,
//     });
//   };

//   const onGestureEvent = Animated.event(
//     [{ nativeEvent: { translationX: draggedValue.x, translationY: draggedValue.y } }],
//     { useNativeDriver: true }
//   );

//   const onHandlerStateChange = (event, index) => {
//     if (event.nativeEvent.oldState === State.ACTIVE) {
//       setDraggingIndex(null);
//       draggedValue.setValue({ x: 0, y: 0 });
//     } else if (event.nativeEvent.state === State.BEGAN) {
//       setDraggingIndex(index);
//     }
//   };

//   const renderPhoto = (photo, index) => {
//     const isBeingDragged = index === draggingIndex;
//     const transform = isBeingDragged ? draggedValue.getTranslateTransform() : [];

//     return (
//       <MotiView
//         key={photo}
//         from={{ opacity: 0, scale: 0.8 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.8 }}
//         transition={{ type: 'timing', duration: 300, delay: index * 100 }}
//         style={styles.photoWrapper}
//       >
//         <PanGestureHandler
//           onGestureEvent={onGestureEvent}
//           onHandlerStateChange={(event) => onHandlerStateChange(event, index)}
//         >
//           <Animated.View style={[styles.photoItem, { transform }]}>
//             <Image 
//               source={{ uri: photo }} 
//               style={styles.photo}
//               resizeMode="cover"
//             />
//             <TouchableOpacity
//               style={styles.removeButton}
//               onPress={() => removePhoto(index)}
//             >
//               <FontAwesome5 name="times-circle" size={24} color="#8B9DC3" solid />
//             </TouchableOpacity>
//             <View style={styles.orderBadge}>
//               <Text style={styles.orderText}>{index + 1}</Text>
//             </View>
//           </Animated.View>
//         </PanGestureHandler>
//       </MotiView>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <Text style={styles.title}>Your Photos</Text>
//           <Text style={styles.subtitle}>
//             {photos.length}/{maxPhotos} photos uploaded
//           </Text>
//         </View>

//         <View style={styles.photoGrid}>
//           <AnimatePresence>
//             {photos.map((photo, index) => renderPhoto(photo, index))}
//           </AnimatePresence>

//           {photos.length < maxPhotos && (
//             <MotiView
//               from={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ type: 'spring', delay: photos.length * 100 }}
//               style={styles.photoWrapper}
//             >
//               <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={pickImage}
//                 disabled={uploading}
//               >
//                 {uploading ? (
//                   <MotiView
//                     from={{ rotate: '0deg' }}
//                     animate={{ rotate: '360deg' }}
//                     transition={{ type: 'timing', duration: 1000, loop: true }}
//                   >
//                     <FontAwesome5 name="spinner" size={32} color="#8B9DC3" />
//                   </MotiView>
//                 ) : (
//                   <>
//                     <FontAwesome5 name="plus-circle" size={32} color="#8B9DC3" />
//                     <Text style={styles.addButtonText}>Add Photos</Text>
//                     <Text style={styles.addButtonSubtext}>
//                       Tap to upload • Drag to reorder
//                     </Text>
//                   </>
//                 )}
//               </TouchableOpacity>
//             </MotiView>
//           )}
//         </View>

//         <TouchableOpacity
//           style={[
//             styles.continueButton,
//             photos.length === 0 && styles.continueButtonDisabled
//           ]}
//           onPress={handleNext}
//           disabled={photos.length === 0}
//         >
//           <Text style={styles.continueButtonText}>Continue</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#F0F2F7',
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     marginBottom: 24,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '800',
//     color: '#8B9DC3',
//     marginBottom: 4,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#717F9B',
//   },
//   photoGrid: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginHorizontal: -GRID_GAP / 2,
//     marginTop: -GRID_GAP / 2,
//   },
//   photoWrapper: {
//     width: '50%',
//     padding: GRID_GAP / 2,
//   },
//   photoItem: {
//     width: '100%',
//     aspectRatio: 1,
//     borderRadius: 16,
//     overflow: 'hidden',
//     backgroundColor: '#E8ECF5',
//   },
//   photo: {
//     width: '100%',
//     height: '100%',
//   },
//   removeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 12,
//     padding: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   orderBadge: {
//     position: 'absolute',
//     bottom: 8,
//     left: 8,
//     backgroundColor: '#8B9DC3',
//     borderRadius: 12,
//     width: 24,
//     height: 24,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   orderText: {
//     color: '#FFFFFF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   addButton: {
//     width: '100%',
//     aspectRatio: 1,
//     borderRadius: 16,
//     borderWidth: 2,
//     borderStyle: 'dashed',
//     borderColor: '#8B9DC3',
//     backgroundColor: '#E8ECF5',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   addButtonText: {
//     fontSize: 16,
//     color: '#8B9DC3',
//     fontWeight: '600',
//   },
//   addButtonSubtext: {
//     fontSize: 12,
//     color: '#717F9B',
//     marginTop: 4,
//   },
//   continueButton: {
//     backgroundColor: '#8B9DC3',
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//     marginVertical: 16,
//   },
//   continueButtonDisabled: {
//     backgroundColor: '#CFD5E3',
//   },
//   continueButtonText: {
//     color: '#FFFFFF',
//     fontSize: 18,
//     fontWeight: '700',
//   },
// });

// export default PhotosScreen;

import React, { useState, useRef } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Text,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { MotiView, AnimatePresence } from 'moti';
import { FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useUserInfo } from '../contexts/UserInfoContext';
import { useAuth } from '../contexts/AuthContext';
import { updateProfilePhoto } from '../services/ProfileService';

const { width } = Dimensions.get('window');
const GRID_GAP = 16;

const PhotosScreen = () => {
  const [photos, setPhotos] = useState([]);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [uploading, setUploading] = useState(false);
  const draggedValue = useRef(new Animated.ValueXY()).current;
  const navigation = useNavigation();
  const { userInfo, setUserInfo } = useUserInfo();
  const { user } = useAuth();
  const maxPhotos = 6;

  // const handleNext = async () => {
  //   try {
  //     setUploading(true);
      
  //     // Upload each photo to Supabase and get public URLs
  //     const uploadPromises = photos.map(async (photoUri) => {
  //       const { photo, error } = await updateProfilePhoto(user.id, photoUri);
  //       if (error) throw error;
  //       return photo;
  //     });

  //     const uploadedPhotoUrls = await Promise.all(uploadPromises);

  //     // Update userInfo with the Supabase photo URLs
  //     setUserInfo({
  //       ...userInfo,
  //       photos: uploadedPhotoUrls.filter(url => url != null), // Filter out any failed uploads
  //     });

  //     Toast.show({
  //       type: 'success',
  //       text1: 'Photos uploaded successfully',
  //       position: 'bottom',
  //     });

  //     navigation.navigate('InterestTags');
  //   } catch (error) {
  //     console.error('Error uploading photos:', error);
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error uploading photos',
  //       text2: 'Please try again',
  //       position: 'bottom',
  //     });
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  const handleNext = async () => {
    try {
      setUploading(true);
      
      // Upload each photo to Supabase and get public URLs
      const uploadPromises = photos.map(photoUri => updateProfilePhoto(user.id, photoUri));
      const uploadResults = await Promise.all(uploadPromises);
      
      // Filter out any failed uploads and get the URLs
      const uploadedPhotoUrls = uploadResults
        .filter(result => result && result.photo)
        .map(result => result.photo);
  
      // Update userInfo with the Supabase photo URLs
      setUserInfo({
        ...userInfo,
        photos: uploadedPhotoUrls,
      });
  
      Toast.show({
        type: 'success',
        text1: 'Photos uploaded successfully',
        position: 'bottom',
      });
  
      navigation.navigate('InterestTags');
    } catch (error) {
      console.error('Error uploading photos:', error);
      Toast.show({
        type: 'error',
        text1: 'Error uploading photos',
        text2: 'Please try again',
        position: 'bottom',
      });
    } finally {
      setUploading(false);
    }
  };
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
        allowsEditing: false,
        aspect: [4, 4],
        quality: 0.8,
        allowsMultipleSelection: true,
        maxSelected: maxPhotos - photos.length,
      });
  
      if (!result.canceled && result.assets) {
        const newPhotos = result.assets.map(asset => asset.uri);
        const updatedPhotos = [...photos, ...newPhotos].slice(0, maxPhotos);
        setPhotos(updatedPhotos);
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error selecting photos',
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
    setPhotos(newPhotos);
    
    Toast.show({
      type: 'success',
      text1: 'Photo removed',
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  // Rest of the component remains the same...
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
    const transform = isBeingDragged ? draggedValue.getTranslateTransform() : [];

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
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => removePhoto(index)}
            >
              <FontAwesome5 name="times-circle" size={24} color="#8B9DC3" solid />
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
                    <FontAwesome5 name="spinner" size={32} color="#8B9DC3" />
                  </MotiView>
                ) : (
                  <>
                    <FontAwesome5 name="plus-circle" size={32} color="#8B9DC3" />
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

        <TouchableOpacity
          style={[
            styles.continueButton,
            (photos.length === 0 || uploading) && styles.continueButtonDisabled
          ]}
          onPress={handleNext}
          disabled={photos.length === 0 || uploading}
        >
          <Text style={styles.continueButtonText}>
            {uploading ? 'Uploading...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F7',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#8B9DC3',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#717F9B',
  },
  photoGrid: {
    flex: 1,
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
    backgroundColor: '#E8ECF5',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#8B9DC3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  addButton: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#8B9DC3',
    backgroundColor: '#E8ECF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    color: '#8B9DC3',
    fontWeight: '600',
  },
  addButtonSubtext: {
    fontSize: 12,
    color: '#717F9B',
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: '#8B9DC3',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#CFD5E3',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});


export default PhotosScreen;