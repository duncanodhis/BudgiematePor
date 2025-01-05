import { supabase } from '../utils/supabase';  
import * as FileSystem from 'expo-file-system';

// Fetch user profile by user_id
export const getUserProfile = async (user_id) => {
  try {
    // Query the user profile table to fetch user details by user_id
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user_id)
      .single();
 
    if (error) {
      if (error.code === 'PGRST116') {
        // Handle the case where no rows are returned
        return { profile: null, error: 'No user profile found' };
      }
      throw error;
    }
    return { profile: data, error: null };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return { profile: null, error };
  }
};

// Update user profile by user_id
export const updateUserProfile = async (user_id, profileData) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .upsert({ user_id, ...profileData });

    if (error) {
      throw error;
    }  
    console.log("User profile updated successfully:", data);
    return { profile: data, error: null };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { profile: null, error };
  }
};

// Update user profile by user_id
export const updateUserPreference = async (user_id, preferenceData) => {
  try {
    const { data, error } = await supabase
      .from('user_preferences')
      .upsert({ user_id, ... preferenceData });

    if (error) {
      throw error;
    }  
    console.log("User preference updated successfully:", data);
    return { profile: data, error: null };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return { profile: null, error };
  }
};

// // Update user profile by user_id
// export const updateProfilePhoto = async (user_id, photoUrl) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       // Fetch the file from the URL
//       const response = await fetch(photoUrl);
//       const blob = await response.blob();
//       const photoFile = new File([blob], `${Date.now()}.jpeg`, { type: blob.type });
//       const uniqueFilename = `${Date.now()}_${photoFile.name}`;
      
//       // Save the image to the local file system
//       const localUri = `${FileSystem.documentDirectory}${uniqueFilename}`;
//       const fileReader = new FileReader();

//       fileReader.onload = async () => {
//         try {
//           const base64data = fileReader.result.split(',')[1];
//           await FileSystem.writeAsStringAsync(localUri, base64data, { encoding: FileSystem.EncodingType.Base64 });

//           // Delete the existing photo if it exists
//           const { error: deleteError } = await supabase.storage
//             .from('userphotos')
//             .remove([`public/${user_id}/${photoFile.name}`]);

//           if (deleteError && deleteError.statusCode !== 404) {
//             throw deleteError;
//           }

//           // Upload the new photo to Supabase storage
//           const { data: storageData, error: storageError } = await supabase.storage
//             .from('userphotos')
//             .upload(`public/${user_id}/${uniqueFilename}`, {
//               uri: localUri,
//               type: 'image/jpeg',
//               name: uniqueFilename,
//             });

//           if (storageError) {
//             throw storageError;
//           }

//           // Get the public URL of the uploaded photo
//           const { data: publicURLData, error: urlError } = supabase.storage
//             .from('userphotos')
//             .getPublicUrl(`public/${user_id}/${uniqueFilename}`);

//           if (urlError) {
//             throw urlError;
//           }

//           // Update the user's photo URL in the database
//           const { data, error } = await supabase
//             .from('userphotos')
//             .upsert([
//               {
//                 user_id,
//                 photo_url: publicURLData,
//                 created_at: new Date(),
//                 updated_at: new Date(),
//               },
//             ])
//             .select();

//           if (error) {
//             throw error;
//           }

//           // Parse the photo_url to get the actual URL
//           const photoUrlObj = JSON.parse(data[0].photo_url);
//           resolve({ photo: photoUrlObj.publicUrl, error: null });
//         } catch (error) {
//           reject(error);
//         }
//       };

//       fileReader.onerror = () => {
//         reject(new Error('Failed to read file'));
//       };

//       fileReader.readAsDataURL(blob);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

export const updateProfilePhoto = async (user_id, photoUrl) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Fetch the file from the URL
      const response = await fetch(photoUrl);
      const blob = await response.blob();
      const photoFile = new File([blob], `${Date.now()}.jpeg`, { type: blob.type });
      
      // Generate a unique filename based on current timestamp and random string
      const uniqueFilename = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}_${photoFile.name}`;

      // Save the image to the local file system
      const localUri = `${FileSystem.documentDirectory}${uniqueFilename}`;
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        try {
          const base64data = fileReader.result.split(',')[1];
          await FileSystem.writeAsStringAsync(localUri, base64data, { encoding: FileSystem.EncodingType.Base64 });

          // Delete the existing photo if it exists
          const { error: deleteError } = await supabase.storage
            .from('userphotos')
            .remove([`public/${user_id}/${photoFile.name}`]);

          // Handle delete error gracefully
          if (deleteError && deleteError.statusCode !== 404) {
            throw deleteError;
          }

          // Upload the new photo to Supabase storage
          const { data: storageData, error: storageError } = await supabase.storage
            .from('userphotos')
            .upload(`public/${user_id}/${uniqueFilename}`, {
              uri: localUri,
              type: 'image/jpeg',
              name: uniqueFilename,
            });

          if (storageError) {
            throw storageError;
          }

          // Get the public URL of the uploaded photo
          const { data: publicURLData, error: urlError } = supabase.storage
            .from('userphotos')
            .getPublicUrl(`public/${user_id}/${uniqueFilename}`);

          if (urlError) {
            throw urlError;
          }

          // Update the user's photo URL in the database
          const { data, error } = await supabase
            .from('userphotos')
            .upsert([
              {
                user_id,
                photo_url: publicURLData,
                created_at: new Date(),
                updated_at: new Date(),
              },
            ])
            .select();

          if (error) {
            throw error;
          }

          // Resolve with the new photo URL
          resolve({ photo: publicURLData.publicUrl, error: null });
        } catch (error) {
          reject(error);
        }
      };

      fileReader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      fileReader.readAsDataURL(blob);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateInterestTags = async (user_id, tags) => {
  try {
    // Validate input
    if (!user_id || !Array.isArray(tags)) {
      throw new Error('Invalid input parameters');
    }

    // Format the data for upsert
    const interestData = {
      user_id,
      tag: tags
    };

    // Update or insert the interest tags
    const { data, error } = await supabase
      .from('user_interests')
      .upsert(interestData)
      .select();

    if (error) {
      throw error;
    }

    console.log("User interests updated successfully:", data);
    return { interests: data[0], error: null };

  } catch (error) {
    console.error("Error updating user interests:", error);
    return { interests: null, error };
  }
};

export const deleteProfilePhoto = async (user_id) => {
  try {
    // Mark the user's profile photo as deleted
    const { data, error } = await supabase
      .from('UserPhotos')
      .update({ is_deleted: true })
      .eq('user_id', user_id);

    if (error) {
      throw error;
    }
    return { success: true, error: null };
  } catch (error) {
    console.error("Error deleting profile photo:", error);
    return { success: false, error };
  }
};
