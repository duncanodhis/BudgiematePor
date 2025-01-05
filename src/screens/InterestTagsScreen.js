import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { MotiView, AnimatePresence } from 'moti';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useUserInfo } from '../contexts/UserInfoContext';
import { useAuth } from '../contexts/AuthContext';
import { updateInterestTags } from '../services/ProfileService';
const { width } = Dimensions.get('window');

const CATEGORIES = {
  'Lifestyle': ['Food', 'Fashion', 'Fitness', 'Meditation', 'Yoga', 'Spirituality'],
  'Entertainment': ['Movies', 'Music', 'Gaming', 'Comedy', 'Stand-up', 'Podcasts'],
  'Outdoors': ['Hiking', 'Adventure', 'Beach', 'Camping', 'Nature', 'Gardening'],
  'Creative': ['Art', 'Photography', 'Cooking', 'Dancing', 'Crafting', 'DIY Projects'],
  'Social': ['Travel', 'Nightlife', 'Volunteering', 'Wine Tasting', 'Board Games', 'Pets'],
  'Culture': ['Reading', 'Technology', 'History', 'Astrology', 'Sports', 'Theatre']
};

const InterestTagsScreen = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Lifestyle');
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, setUserInfo } = useUserInfo();
  const {user} = useAuth();
  

  const handleNext = async () => {
    try {
      setIsLoading(true);
      
      // Update interests in Supabase
      const { interests, error } = await updateInterestTags(user.id, selectedTags);
      
      if (error) {
        console.error('Error updating interests:', error);
        // You might want to add error handling UI here
        return;
      }

      // Update local context
      setUserInfo({
        ...userInfo,
        interests: selectedTags,
      });

      // Navigate to next screen
      navigation.navigate('Preference');
    } catch (error) {
      console.error('Error in handleNext:', error);
      // You might want to add error handling UI here
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
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

  const renderCategory = (category, index) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
    });

    return (
      <Animated.View
        key={category}
        style={[
          styles.categoryContainer,
          { transform: [{ scale }] }
        ]}
      >
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          style={styles.categoryContent}
        >
          <View style={styles.categoryHeader}>
            <FontAwesome5 
              name={getCategoryIcon(category)} 
              size={24} 
              color="#8B9DC3" 
            />
            <Text style={styles.categoryTitle}>{category}</Text>
          </View>
          <View style={styles.tagsGrid}>
            <AnimatePresence>
              {CATEGORIES[category].map((tag, tagIndex) => (
                <MotiView
                  key={tag}
                  from={{ opacity: 0, scale: 0.8, translateY: 20 }}
                  animate={{ opacity: 1, scale: 1, translateY: 0 }}
                  exit={{ opacity: 0, scale: 0.8, translateY: -20 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    delay: tagIndex * 50,
                  }}
                  style={styles.tagWrapper}
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
            </AnimatePresence>
          </View>
        </MotiView>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MotiView
          from={{ opacity: 0, translateY: -20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15 }}
          style={styles.header}
        >
          <Text style={styles.mainTitle}>What interests you?</Text>
          <Text style={styles.subtitle}>Swipe to explore different categories</Text>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 15, delay: 200 }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
            contentContainerStyle={styles.categoriesScrollContent}
          >
            {Object.keys(CATEGORIES).map((category) => (
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
                  color={activeCategory === category ? '#8B9DC3' : '#717F9B'} 
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
        </MotiView>

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
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'spring', damping: 15, delay: 400 }}
        style={styles.footer}
      >
        <Text style={styles.selectedCountText}>
          {selectedTags.length} interests selected
        </Text>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (selectedTags.length === 0 || isLoading) && styles.continueButtonDisabled
          ]}
          onPress={handleNext}
          disabled={selectedTags.length === 0 || isLoading}
        >
          <Text style={styles.continueButtonText}>
            {isLoading ? 'Saving...' : 'Continue'}
          </Text>
        </TouchableOpacity>
      </MotiView>

        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F2F7',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#8B9DC3',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#717F9B',
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
    backgroundColor: '#E8ECF5',
  },
  categoryTabActive: {
    backgroundColor: '#CFD5E3',
  },
  categoryTabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#717F9B',
    marginLeft: 8,
  },
  categoryTabTextActive: {
    color: '#8B9DC3',
  },
  categoryContainer: {
    width: width - 32,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  categoryContent: {
    backgroundColor: '#FFFFFF',
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
    color: '#8B9DC3',
    marginLeft: 12,
  },
  tagsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginHorizontal: -4,
  },
  tagWrapper: {
    padding: 4,
    width: '50%',
  },
  tag: {
    backgroundColor: '#F0F2F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E8ECF5',
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: '#8B9DC3',
    borderColor: '#8B9DC3',
  },
  tagText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#717F9B',
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
  tagsScrollView: {
    flex: 1,
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 24,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
  },
  selectedCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#717F9B',
    textAlign: 'center',
    marginBottom: 16,
  },
  continueButton: {
    backgroundColor: '#8B9DC3',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#CFD5E3',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default InterestTagsScreen;