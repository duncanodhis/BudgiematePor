import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AVAILABLE_TAGS = [
  'Movies', 'Music', 'Food', 'Travel', 'Sports', 'Art',
  'Reading', 'Gaming', 'Fitness', 'Photography', 'Cooking',
  'Dancing', 'Technology', 'Fashion', 'Nature', 'Pets',
  'Meditation', 'Yoga', 'Hiking', 'Adventure', 'Beach', 
  'Nightlife', 'Volunteering', 'Camping', 'Wine Tasting', 'Crafting', 
  'Board Games', 'DIY Projects', 'History', 'Astrology', 'Podcasts', 
  'Spirituality', 'Comedy', 'Stand-up', 'Gardening' 
 
];

const MAX_SELECTION = 6;

const InterestTags = ({ selectedTags, onTagsUpdate }) => {
  const toggleTag = (tag) => {
    // Prevent selection if already 6 tags are selected
    if (selectedTags.includes(tag)) {
      onTagsUpdate(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < MAX_SELECTION) {
      onTagsUpdate([...selectedTags, tag]);
    }
  };

  return (
    <View style={styles.tagsContainer}>
      <Text style={styles.tagsTitle}>Interests</Text>
      <View style={styles.tagsWrapper}>
        {AVAILABLE_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            style={[
              styles.tag,
              selectedTags.includes(tag) ? styles.tagSelected : null,
            ]}
            onPress={() => toggleTag(tag)}
            disabled={selectedTags.length >= MAX_SELECTION && !selectedTags.includes(tag)} // Disable if 6 tags are selected
          >
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag) ? styles.tagTextSelected : null,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedTags.length >= MAX_SELECTION && (
        <Text style={styles.limitMessage}>You can select up to 6 tags only.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    marginVertical: 16,
  },
  tagsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tag: {
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 4,
  },
  tagSelected: {
    backgroundColor: '#3B5998',
  },
  tagText: {
    color: '#333',
  },
  tagTextSelected: {
    color: '#fff',
  },
  limitMessage: {
    fontSize: 14,
    color: 'red',
    marginTop: 8,
  },
});

export default InterestTags;
