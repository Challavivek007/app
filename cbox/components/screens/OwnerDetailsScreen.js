// screens/OwnerDetailsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';

const OwnerDetailsScreen = () => {
  const [ownerDetails, setOwnerDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOwnerDetails();
  }, []);

  const fetchOwnerDetails = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/venues');
      const data = await response.json();
      setOwnerDetails(data);
    } catch (error) {
      console.error('Error fetching owner details:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: `http://YOUR_SERVER_IP:3000/${item.photos[0]}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{item.name}</Text>

        <Text style={styles.label}>Mobile:</Text>
        <Text style={styles.text}>{item.mobile}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{item.email}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <FlatList
        data={ownerDetails}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

export default OwnerDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  info: {
    marginTop: 8,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
