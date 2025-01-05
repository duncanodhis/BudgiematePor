// screens/LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#FF5A5F" />
  </View>
);

export default LoadingScreen;