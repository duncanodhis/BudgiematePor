// src/services/databaseService.js

import { supabase } from './supabaseClient';

export const fetchUserData = async (userId) => {
  const { data, error } = await supabase
    .from('users') // Replace 'users' with your table name
    .select('*')
    .eq('id', userId); // Assuming 'id' is the unique identifier for a user
  return { data, error };
};
