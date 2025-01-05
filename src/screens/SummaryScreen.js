import React from 'react';
import { View, Text, Button } from 'react-native';

const SummaryScreen = ({ route, navigation }) => {
  const { basicInfo, interestTags, preferences, photo } = route.params || {};

  return (
    <View>
      <Text>Summary</Text>
      <Text>Basic Info: {basicInfo}</Text>
      <Text>Interest Tags: {interestTags}</Text>
      <Text>Preferences: {preferences}</Text>
      <Text>Photo: {photo}</Text>

      <Button
        title="Save"
        onPress={() => {
          // Save the data here
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

export default SummaryScreen;
