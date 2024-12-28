// import React, { useRef, useState } from 'react';
// import { StyleSheet, View, Button, Text } from 'react-native';
// import MapView, { Marker, Polygon } from 'react-native-maps';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';

// const ExploreScreen = () => {
//   const mapViewRef = useRef(null);
//   const [polygonCoordinates, setPolygonCoordinates] = useState([
//     { latitude: -37.8136, longitude: 144.9631 },
//     { latitude: -37.8146, longitude: 144.9631 },
//     { latitude: -37.8146, longitude: 144.9641 },
//     { latitude: -37.8136, longitude: 144.9641 },
//   ]);

//   const handleTakeSnapshot = async () => {
//     try {
//       const snapshot = await mapViewRef.current.takeSnapshot({
//         format: 'png',
//         quality: 0.8,
//         result: 'file',
//       });

//       const asset = await MediaLibrary.createAssetAsync(snapshot.uri);
//       await MediaLibrary.createAlbumAsync('MapSnapshots', asset, false);

//       if (await Sharing.isAvailableAsync()) {
//         Sharing.shareAsync(snapshot.uri);
//       } else {
//         alert('Sharing is not available on your device.');
//       }
//     } catch (error) {
//       console.error('Error taking snapshot:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         ref={mapViewRef}
//         style={styles.map}
//         initialRegion={{
//           latitude: -37.8136,
//           longitude: 144.9631,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       >
//         {/* Marker with custom view */}
//         <Marker coordinate={{ latitude: -37.8136, longitude: 144.9631 }}>
//           <View style={styles.marker}>
//             <Icon name="location-sharp" size={40} color="#FF6347" />
//           </View>
//         </Marker>

//         {/* Polygon */}
//         <Polygon coordinates={polygonCoordinates} strokeColor="#F00" fillColor="rgba(255,0,0,0.3)" />
//       </MapView>

//       <Button title="Take Snapshot and Share" onPress={handleTakeSnapshot} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   map: {
//     width: '100%',
//     height: '100%',
//   },
//   marker: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// export default ExploreScreen;
import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Modal, Platform } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
// import * as MediaLibrary from 'expo-media-library';
// import * as Sharing from 'expo-sharing';
import * as Calendar from 'expo-calendar';
import { LinearGradient } from 'expo-linear-gradient';

const ExploreScreen = () => {
  const mapViewRef = useRef(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState(0);
  const [weather, setWeather] = useState(null);
  const [venues] = useState([
    {
      id: 1,
      name: 'Romantic Restaurant',
      coordinate: { latitude: -37.8136, longitude: 144.9631 },
      type: 'restaurant',
      priceRange: '$$',
      rating: 4.5,
      description: 'Cozy Italian restaurant with candlelit dining',
    },
    {
      id: 2,
      name: 'City Garden',
      coordinate: { latitude: -37.8146, longitude: 144.9641 },
      type: 'outdoor',
      priceRange: '$',
      rating: 4.8,
      description: 'Beautiful botanical gardens perfect for a romantic walk',
    },
  ]);

  const fetchWeather = async () => {
    // Implement weather API integration
    setWeather({ temp: '22°C', condition: 'Sunny' });
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const calculateBudget = (activities) => {
    // Budget calculation logic
    return activities.reduce((total, activity) => total + activity.cost, 0);
  };

  const addToCalendar = async (date) => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendar = calendars.find(cal => cal.isPrimary);

        await Calendar.createEventAsync(defaultCalendar.id, {
          title: `Date at ${selectedVenue.name}`,
          startDate: date,
          endDate: new Date(date.getTime() + 2 * 60 * 60 * 1000),
          location: selectedVenue.name,
          notes: selectedVenue.description,
        });
      }
    } catch (error) {
      console.error('Calendar error:', error);
    }
  };

  const VenueCard = ({ venue }) => (
    <TouchableOpacity
      style={styles.venueCard}
      onPress={() => setSelectedVenue(venue)}
    >
      <LinearGradient
        colors={['#FF6B6B', '#FF8E8E']}
        style={styles.venueCardGradient}
      >
        <Text style={styles.venueName}>{venue.name}</Text>
        <Text style={styles.venuePrice}>{venue.priceRange}</Text>
        <Text style={styles.venueRating}>★ {venue.rating}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: -37.8136,
          longitude: 144.9631,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
      >
        {venues.map((venue) => (
          <Marker
            key={venue.id}
            coordinate={venue.coordinate}
            onPress={() => setSelectedVenue(venue)}
          >
            <Icon name="heart" size={30} color="#FF6B6B" />
            <Callout>
              <Text>{venue.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      {/* Weather Widget */}
      <View style={styles.weatherWidget}>
        <Icon name="sunny" size={24} color="#FFD700" />
        <Text style={styles.weatherText}>{weather?.temp}</Text>
      </View>

      {/* Venue List */}
      <ScrollView
        horizontal
        style={styles.venueList}
        showsHorizontalScrollIndicator={false}
      >
        {venues.map(venue => (
          <VenueCard key={venue.id} venue={venue} />
        ))}
      </ScrollView>

      {/* Venue Detail Modal */}
      <Modal
        visible={!!selectedVenue}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedVenue(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSelectedVenue(null)}
            >
              <Icon name="close" size={24} color="#333" />
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>{selectedVenue?.name}</Text>
            <Text style={styles.modalDescription}>{selectedVenue?.description}</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#FF6B6B' }]}
                onPress={() => addToCalendar(new Date())}
              >
                <Icon name="calendar" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Schedule</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
                onPress={() => {/* Implement share functionality */}}
              >
                <Icon name="share" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  weatherWidget: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 10,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  weatherText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
  venueList: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
  },
  venueCard: {
    width: 200,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: 'hidden',
  },
  venueCardGradient: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  venueName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  venuePrice: {
    color: '#FFF',
    fontSize: 14,
  },
  venueRating: {
    color: '#FFF',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: '40%',
  },
  closeButton: {
    position: 'absolute',
    right: 20,
    top: 20,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    width: '45%',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExploreScreen;