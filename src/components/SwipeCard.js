import React, { useRef, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Animated } from "react-native";
import Swiper from "react-native-deck-swiper";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

const EmptyStateCard = () => (
  <View style={[styles.card, styles.emptyStateCard]}>
    <View style={styles.emptyStateContent}>
      <FontAwesome name="users" size={50} color="#ccc" />
      <Text style={styles.emptyStateTitle}>No More Profiles</Text>
      <Text style={styles.emptyStateText}>
        We've run out of profiles to show you.
      </Text>
      <Text style={styles.emptyStateSubText}>
        Check back later for new matches!
      </Text>
    </View>
  </View>
);

const SwipeCard = ({ data: initialData }) => {
  const swiperRef = useRef(null);
  const [data, setData] = useState(initialData || []);
  const [imageLoadErrors, setImageLoadErrors] = useState({});
  const defaultImage = require("../../assets/images/user9.jpg");

  // If there's no data, show the empty state card
  const cardData = data.length > 0 ? data : [{ isEmpty: true }];

  const handleImageError = (card) => {
    setImageLoadErrors(prev => ({
      ...prev,
      [card.name || 'unknown']: true
    }));
    console.warn(`Failed to load image for profile: ${card.name || 'Unknown User'}`);
  };

  const renderCard = (card) => {
    if (!card || card.isEmpty) {
      return <EmptyStateCard />;
    }
    
    const hasImageError = imageLoadErrors[card.name || 'unknown'];
    const imageSource = card.imgPath ? card.imgPath : defaultImage;
    
    return (
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={imageSource}
            style={styles.cardImage}
            defaultSource={defaultImage}
            onError={() => handleImageError(card)}
          />
          {hasImageError && (
            <View style={styles.imageErrorOverlay}>
              <FontAwesome name="image" size={40} color="#666" />
              <Text style={styles.imageErrorText}>Image unavailable</Text>
            </View>
          )}
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>
            {card.name ? `${card.name}, ${card.age || 'N/A'}` : 'Unknown User'}
          </Text>
          <Text style={styles.cardBio}>{card.bio || 'No bio available'}</Text>
          <Text style={styles.cardDistance}>{card.distance || 'Distance unknown'}</Text>
        </View>
      </View>
    );
  };

  const handleAction = (action) => {
    if (!swiperRef.current || data.length === 0) {
      return;
    }

    switch (action) {
      case "dismiss":
        swiperRef.current.swipeLeft();
        break;
      case "like":
        swiperRef.current.swipeRight();
        break;
      case "favorite":
        if (data.length > 0) {
          const currentCard = data[0];
          const name = currentCard?.name || 'Profile';
          Alert.alert(
            "Favorite",
            `${name} added to favorites!`,
            [{ text: "OK" }]
          );
        }
        break;
      default:
        console.warn("Unknown action:", action);
        break;
    }
  };

  const handleSwipe = (index, direction) => {
    const swipedCard = data[index];
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    
    if (swipedCard?.name) {
      setImageLoadErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[swipedCard.name];
        return newErrors;
      });
      
      const name = swipedCard.name;
      if (direction === 'left') {
        console.log(`Dismissed ${name}`);
      } else if (direction === 'right') {
        console.log(`Liked ${name}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        cards={cardData}
        renderCard={renderCard}
        onSwipedLeft={(index) => handleSwipe(index, 'left')}
        onSwipedRight={(index) => handleSwipe(index, 'right')}
        backgroundColor="#f0f0f0"
        stackSize={data.length > 0 ? 3 : 1}
        cardIndex={0}
        containerStyle={{ flex: 1, marginBottom: 100 }}
        showSecondCard={data.length > 0}
        disableTopSwipe={true}
        disableBottomSwipe={true}
        disableLeftSwipe={data.length === 0}
        disableRightSwipe={data.length === 0}
        overlayLabels={data.length > 0 ? {
          left: {
            title: "DISMISS",
            style: {
              label: {
                backgroundColor: "red",
                color: "white",
                fontSize: 18,
                padding: 10,
                borderRadius: 5,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: -20,
              },
            },
          },
          right: {
            title: "LIKE",
            style: {
              label: {
                backgroundColor: "green",
                color: "white",
                fontSize: 18,
                padding: 10,
                borderRadius: 5,
              },
              wrapper: {
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: 20,
                marginLeft: 20,
              },
            },
          },
        } : {}}
      />
      <View style={[
        styles.actionButtons,
        data.length === 0 && styles.disabledActionButtons
      ]}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: data.length === 0 ? "#ddd" : "#ff6b6b" }
          ]}
          onPress={() => handleAction("dismiss")}
          disabled={data.length === 0}
        >
          <AntDesign name="close" size={30} color={data.length === 0 ? "#999" : "white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: data.length === 0 ? "#ddd" : "#f1c40f" }
          ]}
          onPress={() => handleAction("favorite")}
          disabled={data.length === 0}
        >
          <FontAwesome name="star" size={30} color={data.length === 0 ? "#999" : "white"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: data.length === 0 ? "#ddd" : "#2ecc71" }
          ]}
          onPress={() => handleAction("like")}
          disabled={data.length === 0}
        >
          <AntDesign name="heart" size={30} color={data.length === 0 ? "#999" : "white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    position: 'relative',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  noDataText: {
    fontSize: 18,
    color: "#666",
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    flex: 2,
    position: 'relative',
  },
  cardImage: {
    flex: 1,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: "cover",
  },
  imageErrorOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(240, 240, 240, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageErrorText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  cardDetails: {
    flex: 1,
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardBio: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  cardDistance: {
    fontSize: 12,
    color: "#999",
  },
actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 30,
    position: 'absolute', 
    bottom: 0, 
    left: 0, 
    right: 0,  
    backgroundColor: 'transparent',  
    zIndex: 1, 
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyStateCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#ccc',
  },
  emptyStateContent: {
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  emptyStateSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  disabledActionButtons: {
    opacity: 0.7,
  },
});

export default SwipeCard;