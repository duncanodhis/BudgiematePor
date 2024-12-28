import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerificationBadge = ({ isVerified, onVerificationComplete }) => {
  return (
    <View style={styles.verificationContainer}>
      <View style={styles.badgeContent}>
        <Ionicons
          name={isVerified ? 'checkmark-circle' : 'alert-circle'}
          size={24}
          color={isVerified ? '#4CAF50' : '#FFA000'}
        />
        <Text style={styles.verificationText}>
          {isVerified ? 'Verified' : 'Not Verified'}
        </Text>
      </View>
      {!isVerified && (
        <TouchableOpacity onPress={onVerificationComplete} style={styles.verifyButton}>
          <Text style={styles.verifyButtonText}>Verify Now</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  verificationContainer: {
    marginVertical: 16,
    alignItems: 'center',
  },
  badgeContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  verificationText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
  },
  verifyButton: {
    backgroundColor: '#3B5998',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default VerificationBadge;