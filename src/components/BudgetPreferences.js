import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { FontAwesome5 } from '@expo/vector-icons';

const BudgetPreferences = ({ preferences, onPreferencesUpdate }) => {
  const splitOptions = [
    { value: 'equal', icon: 'equals', label: 'Equal Split' },
    { value: 'flexible', icon: 'percentage', label: 'Flexible' },
    { value: 'treat', icon: 'gift', label: 'My Treat' },
  ];

  return (
    <View style={styles.budgetContainer}>
   <View style={styles.headerContainer}>
        <FontAwesome5 name="money-bill-wave" size={24} color="#3B5998" />
        <Text style={styles.budgetTitle}>Budget Preferences</Text>
      </View>
      
      <View style={styles.card}>
        <View style={styles.sliderContainer}>
          <Text style={styles.sliderLabel}>Budget Range</Text>
          <Text style={styles.budgetValue}>
            ${preferences.minBudget} - ${preferences.maxBudget}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1000}
            step={50}
            value={preferences.maxBudget}
            onValueChange={(value) =>
              onPreferencesUpdate({ ...preferences, maxBudget: value })
            }
            minimumTrackTintColor="#3B5998"
            maximumTrackTintColor="#E1E4E8"
            thumbTintColor="#3B5998"
          />
          <View style={styles.sliderLabels}>
            <Text style={styles.rangeLabel}>$0</Text>
            <Text style={styles.rangeLabel}>$1000</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.optionsContainer}>
          <Text style={styles.optionTitle}>How would you like to split the bill?</Text>
          <View style={styles.optionsWrapper}>
            {splitOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
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
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  budgetContainer: {
    marginVertical: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  budgetTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  budgetValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#3B5998',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
  },
  rangeLabel: {
    color: '#666',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#E1E4E8',
    marginVertical: 20,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  optionsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  option: {
    flex: 1,
    backgroundColor: '#F5F6F7',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
  },
  optionSelected: {
    backgroundColor: '#3B5998',
  },
  optionText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  optionTextSelected: {
    color: '#fff',
  },
});

export default BudgetPreferences;
