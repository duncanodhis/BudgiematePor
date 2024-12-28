import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as SplashScreen from 'expo-splash-screen';
import { ArrowRightIcon } from 'react-native-heroicons/outline'; 
const WelcomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'SpaceGrotesk-SemiBold': require('../font/SpaceGrotesk-SemiBold.ttf'),
    'SpaceGrotesk-Regular': require('../font/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-Medium': require('../font/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-Light': require('../font/SpaceGrotesk-Light.ttf'),
    'SpaceGrotesk-Bold': require('../font/SpaceGrotesk-Bold.ttf'),
  });

  const onLayoutView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      onLayout={onLayoutView}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image
          source={require('../../assets/HeartIcon.png')} // Replace with your logo or heart icon
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome to Budgiemate</Text>
        <Text style={styles.subtitle}>
          Find your perfect match, swipe right to connect!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('login')}  
      >
        <Text style={styles.buttonText}>Get Started</Text>
        <ArrowRightIcon color="#3B5998" size={24} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp(100),
    height: hp(100),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B5998', // Bluish color for the background
  },
  header: {
    alignItems: 'center',
    marginBottom: hp(10),
  },
  logo: {
    width: wp(30),
    height: wp(30),
    resizeMode: 'contain',
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(4),
    fontFamily: 'SpaceGrotesk-Bold',
    color: '#ffffff',
    marginBottom: hp(1),
  },
  subtitle: {
    fontSize: hp(2),
    fontFamily: 'SpaceGrotesk-Regular',
    color: '#ffffff',
    textAlign: 'center',
    paddingHorizontal: wp(10),
  },
  getStartedButton: {
    backgroundColor: '#ffffff',
    flexDirection: 'row', // Ensures the text and icon are aligned horizontally
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(2),
    paddingHorizontal: wp(20),
    borderRadius: 30,
  },
  buttonText: {
    fontSize: hp(2.5),
    fontFamily: 'SpaceGrotesk-SemiBold',
    color: '#3B5998', // Bluish color for button text
    marginRight: wp(2), // Adds spacing between text and icon
  },
  icon: {
    marginLeft: wp(1), // Optional: adjusts icon placement for better alignment
  },
});

export default WelcomeScreen;
