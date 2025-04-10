import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Linking } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { MaterialIcons, FontAwesome, MaterialCommunityIcons, Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function VenueDetail() {
  const { id } = useLocalSearchParams(); // Get id from URL
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyVenue = {
      id: id,
      name: 'CBox Arena',
      place: 'Madhapur',
      rating: 5,
      ratingCount: 6,
      timing: '4 AM - 12 AM',
      location: 'Sy no.266, Mallampet (V) Dundigal Gandimaisamma (M) Medchal Malkajgiri (Dist) Hyderabad, Telangana - 502303',
      image: 'https://tse3.mm.bing.net/th?id=OIP.P6BfH5SkpwK4e-PK74VEbQHaFj&pid=Api&P=0&h=180',
      sports: ['Badminton', 'Box Cricket'],
      amenities: ['Drinking Water', 'Washroom', 'Power Backup', 'Parking'],
      rules: [
        'Badminton Non Walking Shoes compulsory for Badminton',
        'Shoes must be worn after entering the facility',
        'Barefoot play is strictly prohibited',
        'A maximum of 4 members per booking per badminton court is admissible'
      ],
      related: [
        'Sports Clubs in Mailampet',
        'Badminton Courts in Mailampet',
        'Box-cricket Clubs in Mailampet',
        'Badminton Courts in Hyderabad',
        'Box-cricket'
      ]
    };

    setTimeout(() => {
      setVenue(dummyVenue);
      setLoading(false);
    }, 1000);
  }, [id]);

  // Icon mapping for sports
  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'Badminton':
        return <MaterialCommunityIcons name="badminton" size={24} color="#00C853" />;
      case 'Box Cricket':
        return <FontAwesome5 name="cricket" size={24} color="#00C853" />;
      default:
        return <MaterialIcons name="sports" size={24} color="#00C853" />;
    }
  };

  // Icon mapping for amenities
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'Drinking Water':
        return <Ionicons name="water" size={20} color="#00C853" />;
      case 'Washroom':
        return <MaterialCommunityIcons name="toilet" size={20} color="#00C853" />;
      case 'Power Backup':
        return <MaterialIcons name="power" size={20} color="#00C853" />;
      case 'Parking':
        return <FontAwesome name="car" size={20} color="#00C853" />;
      default:
        return <MaterialIcons name="check-circle" size={20} color="#00C853" />;
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!venue) {
    return (
      <View style={styles.center}>
        <Text>Venue not found!</Text>
      </View>
    );
  }

  const handleBookNow = () => {
    // Handle booking logic
  };

  const handleShare = () => {
    // Handle share logic
  };

  const handleBulkCorporate = () => {
    // Handle bulk/corporate logic
  };

  const handleViewMap = () => {
    // Open map with venue location
    const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(venue.location)}`;
    Linking.openURL(mapUrl);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} />
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{venue.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{venue.rating} ({venue.ratingCount} ratings)</Text>
          <TouchableOpacity>
            <Text style={styles.rateButton}>Rate Venue</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
            <FontAwesome name="share" size={18} color="white" />
            <Text style={styles.secondaryButtonText}> Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={handleBulkCorporate}>
            <MaterialIcons name="group" size={18} color="white" />
            <Text style={styles.secondaryButtonText}> Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timing</Text>
        <View style={styles.timingContainer}>
          <MaterialIcons name="access-time" size={20} color="#00C853" style={styles.icon} />
          <Text style={styles.sectionContent}>{venue.timing}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Location</Text>
        <View style={styles.locationContainer}>
          <MaterialIcons name="location-on" size={20} color="#00C853" style={styles.icon} />
          <Text style={styles.sectionContent}>{venue.location}</Text>
        </View>
        <TouchableOpacity style={styles.mapButton} onPress={handleViewMap}>
          <MaterialCommunityIcons name="google-maps" size={18} color="#1a73e8" />
          <Text style={styles.linkText}> View larger map</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sports Available</Text>
        <Text style={styles.subtitle}>(Click on sports to view price chart)</Text>
        <View style={styles.sportsContainer}>
          {venue.sports?.map((sport: string, index: number) => (
            <TouchableOpacity key={index} style={styles.sportItem}>
              {getSportIcon(sport)}
              <Text style={styles.sportText}> {sport}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenitiesContainer}>
          {venue.amenities?.map((amenity: string, index: number) => (
            <View key={index} style={styles.amenityItem}>
              {getAmenityIcon(amenity)}
              <Text style={styles.amenityText}> {amenity}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Venue</Text>
        <View style={styles.rulesContainer}>
          {venue.rules?.map((rule: string, index: number) => (
            <View key={index} style={styles.ruleItem}>
              <MaterialIcons name="check-circle" size={16} color="#00C853" style={styles.ruleIcon} />
              <Text style={styles.ruleText}>{rule}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Related To {venue.name}</Text>
        <View style={styles.relatedContainer}>
          <MaterialIcons name="tag" size={18} color="#00C853" style={styles.icon} />
          <Text style={styles.relatedText}>{venue.related?.join(', ')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.bookButton} onPress={handleBookNow}>
        <MaterialIcons name="sports-handball" size={24} color="white" />
        <Text style={styles.bookButtonText}> Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: '100%',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
  },
  headerContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingText: {
    fontSize: 16,
    color: '#555',
    marginRight: 10,
  },
  rateButton: {
    fontSize: 16,
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
  section: {
    marginBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  sectionContent: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#1a73e8',
    marginLeft: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  secondaryButton: {
    backgroundColor: '#00C853',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  sportItem: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 5,
  },
  amenitiesContainer: {
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  rulesContainer: {
    marginTop: 10,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  ruleIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  ruleText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  relatedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  relatedText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  bookButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 5,
  },
  timingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
});