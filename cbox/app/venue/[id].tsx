import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function VenueDetail() {
  const { id } = useLocalSearchParams(); // Get id from URL
  const [venue, setVenue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyVenue = {
      id: id,
      name: 'Sunshine Event Hall',
      place: 'Downtown City',
      price: 2500,
      sqft: 2000,
      openingTime: '9:00 AM',
      closingTime: '11:00 PM',
      mobile: '+91 9876543210',
      email: 'contact@sunshinehall.com',
      image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6',
      slots: ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'],
    };

    setTimeout(() => {
      setVenue(dummyVenue);
      setLoading(false);
    }, 1000);
  }, [id]);

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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: venue.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{venue.name}</Text>
        <Text style={styles.text}>📍 {venue.place}</Text>
        <Text style={styles.text}>💰 ₹{venue.price} / hour</Text>
        <Text style={styles.text}>📐 {venue.sqft || 'N/A'} sqft</Text>
        <Text style={styles.text}>🕗 {venue.openingTime || 'N/A'} - {venue.closingTime || 'N/A'}</Text>
        <Text style={styles.text}>📞 {venue.mobile}</Text>
        <Text style={styles.text}>📧 {venue.email || 'N/A'}</Text>
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotsContainer}>
          {venue.slots.map((slot: string, index: number) => (
            <View key={index} style={styles.slot}>
              <Text style={styles.slotText}>{slot}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#121212',
    minHeight: '100%',
    justifyContent: 'space-between',
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
  detailsContainer: {
    alignItems: 'center', // center align all the texts
    rowGap : 10,
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 6,
    textAlign: 'center',
  },
  bottomSection: {
    marginTop: 30,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  slotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slot: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    margin: 5,
  },
  slotText: {
    color: 'white',
    fontSize: 16,
  },
  bookButton: {
    backgroundColor: '#00C853',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
