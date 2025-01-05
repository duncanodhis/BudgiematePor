import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';
import { MotiView } from 'moti';

const BudgetPreferences = ({ preferences, onPreferencesUpdate }) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const scaleAnimation = useRef(new Animated.Value(0.9)).current;

  const [tempMaxBudget, setTempMaxBudget] = useState(preferences.maxBudget);

  const splitOptions = [
    { value: 'equal', icon: 'equals', label: 'Equal Split', desc: 'Split the bill 50/50' },
    { value: 'flexible', icon: 'percentage', label: 'Flexible', desc: 'Decide in the moment' },
    { value: 'treat', icon: 'gift', label: 'My Treat', desc: "I'll cover the bill" },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
      {
        scale: scaleAnimation,
      },
    ],
    opacity: slideAnimation,
  };

  return (
    <Animated.View style={[styles.budgetContainer, animatedStyle]}>
      <View style={styles.headerContainer}>
        <MotiView
          from={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'timing', duration: 1000 }}
        >
          <FontAwesome5 name="money-bill-wave" size={24} color="#FF6B6B" />
        </MotiView>
        <Text style={styles.budgetTitle}>Dating Budget</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>What's your ideal date budget?</Text>
          <Text style={styles.budgetValue}>
            ${preferences.minBudget} - ${tempMaxBudget}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={50}
            value={tempMaxBudget}
            onValueChange={(value) => setTempMaxBudget(value)} // Update local state immediately
            onSlidingComplete={(value) =>
              onPreferencesUpdate({ ...preferences, maxBudget: value })
            } // Commit to preferences when done
            minimumTrackTintColor="#FF6B6B"
            maximumTrackTintColor="#E1E4E8"
            thumbTintColor="#FF6B6B"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.rangeLabel}>Budget-friendly</Text>
            <Text style={styles.rangeLabel}>Luxurious</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.optionsContainer}>
          <Text style={styles.optionTitle}>Your preferred way to handle the bill?</Text>
          <View style={styles.optionsWrapper}>
            {splitOptions.map((option, index) => (
              <MotiView
                key={option.value}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 600,
                  delay: index * 200,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.option,
                    preferences.splitPreference === option.value && styles.optionSelected,
                  ]}
                  onPress={() =>
                    onPreferencesUpdate({ ...preferences, splitPreference: option.value })
                  }
                >
                  <FontAwesome5
                    name={option.icon}
                    size={20}
                    color={preferences.splitPreference === option.value ? '#fff' : '#666'}
                  />
                  <Text
                    style={[
                      styles.optionText,
                      preferences.splitPreference === option.value && styles.optionTextSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text
                    style={[
                      styles.optionDesc,
                      preferences.splitPreference === option.value && styles.optionDescSelected,
                    ]}
                  >
                    {option.desc}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

 
const styles = StyleSheet.create({
  budgetContainer: {
    marginVertical: 16,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  budgetTitle: {
    fontSize: 28,
    fontWeight: '800',
    marginLeft: 12,
    color: '#333',
    letterSpacing: -0.5,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  budgetValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF6B6B',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -4,
  },
  rangeLabel: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    height: 2,
    backgroundColor: '#F0F2F5',
    marginVertical: 24,
    borderRadius: 1,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  optionsWrapper: {
    gap: 16,
  },
  option: {
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  optionSelected: {
    backgroundColor: '#FF6B6B',
  },
  optionText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textAlign: 'center',
  },
  optionDesc: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
  optionDescSelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
});

export default BudgetPreferences;