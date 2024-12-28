export const categories = [
    {
      id: "cat1",
      name: "Restaurants",
      icon: "restaurant",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&auto=format&fit=crop"
    },
    {
      id: "cat2",
      name: "Cafes",
      icon: "cafe",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop"
    },
    {
      id: "cat3",
      name: "Activities",
      icon: "directions-run",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&auto=format&fit=crop"
    },
    {
      id: "cat4",
      name: "Entertainment",
      icon: "theater-comedy",
      image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=800&auto=format&fit=crop"
    }
  ];
  
  export const priceRanges = [
    { id: 1, label: "$", description: "Under $15" },
    { id: 2, label: "$$", description: "$15-$30" },
    { id: 3, label: "$$$", description: "$31-$60" },
    { id: 4, label: "$$$$", description: "Above $60" }
  ];
  
  export const venues = [
    {
      id: "v1",
      name: "The Urban Kitchen",
      category: "cat1",
      categoryName: "Restaurants",
      priceRange: 2,
      rating: 4.5,
      reviewCount: 128,
      description: "Modern fusion restaurant with locally sourced ingredients",
      images: [
        "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=800&auto=format&fit=crop"
      ],
      thumbnailImage: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&auto=format&fit=crop",
      location: {
        address: "123 Downtown Street",
        city: "Metropolis",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      },
      distance: 0.8,
      openingHours: {
        mon_fri: "11:00 AM - 10:00 PM",
        sat_sun: "10:00 AM - 11:00 PM"
      },
      deals: [
        {
          id: "d1",
          title: "Happy Hour",
          description: "50% off appetizers",
          validUntil: "2024-12-31",
          terms: "Valid Monday-Friday, 3-6 PM"
        }
      ],
      reviews: [
        {
          id: "r1",
          userName: "John D.",
          rating: 5,
          date: "2024-12-20",
          text: "Amazing food and atmosphere!",
          userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop"
        }
      ],
      features: ["Outdoor Seating", "Wheelchair Accessible", "WiFi"],
      bookingAvailable: true,
      cuisine: ["Modern American", "Fusion"]
    },
    {
      id: "v2",
      name: "Café Luna",
      category: "cat2",
      categoryName: "Cafes",
      priceRange: 1,
      rating: 4.8,
      reviewCount: 256,
      description: "Artisanal coffee shop with fresh pastries",
      images: [
        "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1463797221720-6b07e6426c24?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&auto=format&fit=crop"
      ],
      thumbnailImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&auto=format&fit=crop",
      location: {
        address: "456 Maple Avenue",
        city: "Metropolis",
        coordinates: {
          latitude: 40.7129,
          longitude: -74.0061
        }
      },
      distance: 0.3,
      openingHours: {
        mon_fri: "7:00 AM - 8:00 PM",
        sat_sun: "8:00 AM - 7:00 PM"
      },
      deals: [
        {
          id: "d2",
          title: "Morning Special",
          description: "Coffee & Pastry combo for $6",
          validUntil: "2024-12-31",
          terms: "Valid before 11 AM"
        }
      ],
      reviews: [
        {
          id: "r2",
          userName: "Sarah M.",
          rating: 5,
          date: "2024-12-19",
          text: "Best coffee in town!",
          userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop"
        }
      ],
      features: ["Free WiFi", "Power Outlets", "Study-Friendly"],
      bookingAvailable: false,
      specialties: ["Pour Over Coffee", "House-made Pastries"]
    },
    {
      id: "v3",
      name: "Adventure Zone",
      category: "cat3",
      categoryName: "Activities",
      priceRange: 3,
      rating: 4.6,
      reviewCount: 89,
      description: "Indoor rock climbing and adventure sports center",
      images: [
        "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1566241440091-ec10de8db2e1?w=800&auto=format&fit=crop"
      ],
      thumbnailImage: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&auto=format&fit=crop",
      location: {
        address: "789 Sports Complex",
        city: "Metropolis",
        coordinates: {
          latitude: 40.7130,
          longitude: -74.0062
        }
      },
      distance: 1.2,
      openingHours: {
        mon_fri: "9:00 AM - 10:00 PM",
        sat_sun: "8:00 AM - 11:00 PM"
      },
      deals: [
        {
          id: "d3",
          title: "Group Package",
          description: "20% off for groups of 4+",
          validUntil: "2024-12-31",
          terms: "Reservation required"
        }
      ],
      reviews: [
        {
          id: "r3",
          userName: "Mike R.",
          rating: 4,
          date: "2024-12-18",
          text: "Great facilities and friendly staff",
          userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop"
        }
      ],
      features: ["Equipment Rental", "Professional Instructors", "Beginner Friendly"],
      bookingAvailable: true,
      activityTypes: ["Rock Climbing", "Bouldering", "Fitness Classes"]
    },
    {
      id: "v4",
      name: "Starlight Cinema",
      category: "cat4",
      categoryName: "Entertainment",
      priceRange: 2,
      rating: 4.4,
      reviewCount: 312,
      description: "Luxury movie theater with reclining seats",
      images: [
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&auto=format&fit=crop"
      ],
      thumbnailImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&auto=format&fit=crop",
      location: {
        address: "321 Entertainment Blvd",
        city: "Metropolis",
        coordinates: {
          latitude: 40.7131,
          longitude: -74.0063
        }
      },
      distance: 1.5,
      openingHours: {
        mon_fri: "12:00 PM - 11:00 PM",
        sat_sun: "10:00 AM - 12:00 AM"
      },
      deals: [
        {
          id: "d4",
          title: "Tuesday Special",
          description: "All tickets $10",
          validUntil: "2024-12-31",
          terms: "Valid only on Tuesdays"
        }
      ],
      reviews: [
        {
          id: "r4",
          userName: "Lisa K.",
          rating: 5,
          date: "2024-12-17",
          text: "Best movie experience!",
          userImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop"
        }
      ],
      features: ["IMAX", "Dolby Sound", "Food Service"],
      bookingAvailable: true,
      amenities: ["Premium Seating", "In-theater Dining", "Bar Service"]
    }
  ];
  
  // Helper functions remain the same
  export const filterByDistance = (maxDistance) => {
    return venues.filter(venue => venue.distance <= maxDistance);
  };
  
  export const filterByPrice = (priceLevel) => {
    return venues.filter(venue => venue.priceRange <= priceLevel);
  };
  
  export const filterByCategory = (categoryId) => {
    return venues.filter(venue => venue.category === categoryId);
  };
  
  export const searchVenues = (searchTerm) => {
    return venues.filter(venue => 
      venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      venue.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  export const getVenuesWithDeals = () => {
    const currentDate = new Date();
    return venues.filter(venue => 
      venue.deals.some(deal => new Date(deal.validUntil) >= currentDate)
    );
  };
  
  export const sortByRating = (venueList) => {
    return [...venueList].sort((a, b) => b.rating - a.rating);
  };