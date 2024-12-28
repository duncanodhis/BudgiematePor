
// components/ProfileCompletion.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileCompletion = ({ percentage }) => {
  return (
    <View style={styles.completionContainer}>
      <View style={styles.progressBar}>
        <View
          style={[styles.progressFill, { width: `${percentage}%` }]}
        />
      </View>
      <Text style={styles.completionText}>{percentage}% Complete</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  completionContainer: {
    marginVertical: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#f0f2f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3B5998',
  },
  completionText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default ProfileCompletion;