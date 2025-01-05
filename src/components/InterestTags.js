import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Animated,
  Dimensions
} from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// Grouped tags by categories
const CATEGORIES = {
  'Lifestyle': ['Food', 'Fashion', 'Fitness', 'Meditation', 'Yoga', 'Spirituality'],
  'Entertainment': ['Movies', 'Music', 'Gaming', 'Comedy', 'Stand-up', 'Podcasts'],
  'Outdoors': ['Hiking', 'Adventure', 'Beach', 'Camping', 'Nature', 'Gardening'],
  'Creative': ['Art', 'Photography', 'Cooking', 'Dancing', 'Crafting', 'DIY Projects'],
  'Social': ['Travel', 'Nightlife', 'Volunteering', 'Wine Tasting', 'Board Games', 'Pets'],
  'Culture': ['Reading', 'Technology', 'History', 'Astrology', 'Sports', 'Theatre']
};

const InterestTags = ({ selectedTags, onTagsUpdate }) => {
  const [activeCategory, setActiveCategory] = useState('Lifestyle');
  const scrollX = useRef(new Animated.Value(0)).current;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      onTagsUpdate(selectedTags.filter(t => t !== tag));
    } else {
      onTagsUpdate([...selectedTags, tag]);
    }
  };

  const renderCategory = (category, index) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <Animated.View
        key={category}
        style={[
          styles.categoryContainer,
          { transform: [{ scale }] }
        ]}
      >
        <View style={styles.categoryContent}>
          <View style={styles.categoryHeader}>
            <FontAwesome5 
              name={getCategoryIcon(category)} 
              size={24} 
              color="#FF6B6B" 
            />
            <Text style={styles.categoryTitle}>{category}</Text>
          </View>
          <View style={styles.tagsGrid}>
            {CATEGORIES[category].map((tag) => (
              <MotiView
                key={tag}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'timing',
                  duration: 500,
                  delay: CATEGORIES[category].indexOf(tag) * 100,
                }}
              >
                <TouchableOpacity
                  style={[
                    styles.tag,
                    selectedTags.includes(tag) && styles.tagSelected,
                  ]}
                  onPress={() => toggleTag(tag)}
                >
                  <Text
                    style={[
                      styles.tagText,
                      selectedTags.includes(tag) && styles.tagTextSelected,
                    ]}
                  >
                    {tag}
                  </Text>
                </TouchableOpacity>
              </MotiView>
            ))}
          </View>
        </View>
      </Animated.View>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Lifestyle': 'heart',
      'Entertainment': 'film',
      'Outdoors': 'mountain',
      'Creative': 'paint-brush',
      'Social': 'users',
      'Culture': 'book'
    };
    return icons[category];
  };

  return (
    <View style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 1000 }}
      >
        <Text style={styles.mainTitle}>What interests you?</Text>
        <Text style={styles.subtitle}>Swipe to explore different categories</Text>
      </MotiView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesScrollContent}
      >
        {Object.keys(CATEGORIES).map((category, index) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[
              styles.categoryTab,
              activeCategory === category && styles.categoryTabActive,
            ]}
          >
            <FontAwesome5 
              name={getCategoryIcon(category)} 
              size={16} 
              color={activeCategory === category ? '#FF6B6B' : '#666'} 
            />
            <Text
              style={[
                styles.categoryTabText,
                activeCategory === category && styles.categoryTabTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        style={styles.tagsScrollView}
      >
        {Object.keys(CATEGORIES).map((category, index) => renderCategory(category, index))}
      </Animated.ScrollView>

      <MotiView
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: 'timing', duration: 1000 }}
        style={styles.selectedCount}
      >
        <Text style={styles.selectedCountText}>
          {selectedTags.length} interests selected
        </Text>
      </MotiView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  categoriesScroll: {
    maxHeight: 50,
    marginBottom: 24,
  },
  categoriesScrollContent: {
    paddingHorizontal: 8,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  categoryTabActive: {
    backgroundColor: '#FFE5E5',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  categoryTabTextActive: {
    color: '#FF6B6B',
  },
  categoryContainer: {
    width: width - 32,
    paddingHorizontal: 16,
  },
  categoryContent: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E1E4E8',
  },
  tagSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tagTextSelected: {
    color: '#fff',
  },
  selectedCount: {
    marginTop: 24,
    alignItems: 'center',
  },
  selectedCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  tagsScrollView: {
    flex: 1,
  },
});

export default InterestTags;