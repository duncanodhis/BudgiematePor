import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { useUserInfo } from '../contexts/UserInfoContext';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile, updateUserPreference, updateProfilePhoto } from '../services/ProfileService';

const FinalReviewScreen = ({ navigation }) => {
  const { userInfo } = useUserInfo();
  const { user } = useAuth();

   const handleSave = async () => {
    const profileData = {
      name: userInfo.name,
      bio: userInfo.bio,
      birthday: userInfo.birthday,
      location: userInfo.location,
      gender_identity: userInfo.genderIdentity ,
      age: userInfo.age,
      interested_in: userInfo.interestedIn,
    };


    //  const preferenceData = {
    //    min_age: userInfo.preferences.ageRange.min,
    //    max_age: userInfo.preferences.ageRange.max,
    //    min_budget:userInfo.preferences.min_budget,
    //    max_budget:userInfo.preferences.max_budget,
    //    split_preference:userInfo.preferences.split_preference,
    //    distance: userInfo.preferences.distance,
    //    looking_for: userInfo.preferences.lookingFor,
    //    interests: userInfo.preferences.interests,
    //  };

    const { profile, error: profileError } = await updateUserProfile(user.id, profileData);
    //  const { preference, error: preferenceError } = await updateUserPreference(user.id, preferenceData);

    //  let photoError = null;
    //  for (const photoUrl of userInfo.photos) {
    //    const { error } = await updateProfilePhoto(user.id, photoUrl);
    //    if (error) {
    //      photoError = error;
    //      break;
    //    }
    //  }
// || preferenceError || photoError
     if (profileError ) {
       Alert.alert('Error', 'Failed to update profile, preferences, or photos');
     } else {
       Alert.alert('Success', 'Profile, preferences, and photos updated successfully');
       navigation.navigate('Home');
     }
   };
   //const handleSave = async () => {
  //   let photoError = null;
  
  //   for (const photoUrl of userInfo.photos) {
  //     try {
  //       const { error } = await updateProfilePhoto(user.id, photoUrl);
  //       if (error) {
  //         if (error.statusCode === 409 && error.message === "The resource already exists") {
  //           Alert.alert('Info', 'This photo already exists.');
  //         } else {
  //           photoError = error;
  //           break;
  //         }
  //       }
  //     } catch (err) {
  //       photoError = err.message;
  //       break;
  //     }
  //   }
  
  //   if (photoError) {
  //     Alert.alert('Error', `Failed to upload photo: ${photoError}`);
  //   } else if (!photoError) {
  //     Alert.alert('Success', 'Photos uploaded successfully');
  //     navigation.navigate('Home');
  //   }
  // };
  // const handleSave = async () => {
  //   let photoError = null;
  //   const totalPhotos = userInfo.photos.length;
  //   let uploadedPhotos = 0;
  
  //   for (const photoFile of userInfo.photos) {
  //     try {
  //       console.log(`Uploading photo ${uploadedPhotos + 1} of ${totalPhotos}`);
  //       const { photo, error } = await updateProfilePhoto(user.id, photoFile);
  
  //       if (error) {
  //         // Handle the error appropriately
  //         if (error.statusCode === 409 && error.message === "The resource already exists") {
  //           Alert.alert('Info', 'This photo already exists.');
  //         } else {
  //           photoError = error;
  //           break; // Break on error and don't proceed to the next photo
  //         }
  //       } else if (photo) {
  //         // If no error and photo was successfully uploaded, increment the count
  //         uploadedPhotos++;
  //       } else {
  //         // If neither error nor photo is returned (which is unlikely), handle that case
  //         throw new Error('Unknown error during photo upload.');
  //       }
  //     } catch (err) {
  //       photoError = err.message; // Capture the error message
  //       break; // Break the loop if any error occurs
  //     }
  //   }
  
  //   if (photoError) {
  //     Alert.alert('Error', `Failed to upload photo: ${photoError}`);
  //   } else {
  //     Alert.alert('Success', `Photos uploaded successfully (${uploadedPhotos} of ${totalPhotos})`);
  //     navigation.navigate('Home');
  //   }
  // };
  
  
  const renderInfoSection = (label, value) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile Review</Text>
          <Text style={styles.headerSubtitle}>Review your information before continuing</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          {user && <Text style={styles.text}>Logged in as: {user.id}</Text>}
          <View style={styles.card}>
            {renderInfoSection('Name', userInfo.name)}
            {renderInfoSection('Location', userInfo.location)}
            {renderInfoSection('Age', userInfo.birthday.toLocaleDateString())}
            {renderInfoSection('Bio', userInfo.bio)}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <View style={styles.photosGrid}>
            {userInfo.photos?.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.card}>
            {renderInfoSection('Age Range', `${userInfo.preferences.ageRange.min} - ${userInfo.preferences.ageRange.max}`)}
            {renderInfoSection('Distance', `${userInfo.preferences.distance} miles`)}
            {renderInfoSection('Looking For', userInfo.preferences.lookingFor)}
            {renderInfoSection('Interests', userInfo.preferences.interests.join(', '))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  value: {
    flex: 2,
    fontSize: 16,
    color: '#1A1A1A',
  },
  photosGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  photoContainer: {
    width: '33.33%',
    padding: 6,
  },
  photo: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    backgroundColor: '#E5E5E5',
  },
  button: {
    backgroundColor: '#3B5998',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#3B5998',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FinalReviewScreen;