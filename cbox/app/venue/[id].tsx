import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const VenueDetail = () => {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Venue Detail Page</Text>
      <Text style={styles.text}>Venue ID: {id}</Text>
    </View>
  );
};

export default VenueDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // <- make sure it's not black
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
});
    