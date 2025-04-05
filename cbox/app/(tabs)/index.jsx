import { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import VenueCard from '@/components/VenueCard';

const venues = [
  {
    id: '1',
    name: 'PowerPlay Arena',
    place: 'Mumbai',
    price: '1200',
    image: require('@/assets/images/venue1.jpg'),
  },
  {
    id: '2',
    name: 'Cricket Turf Central',
    place: 'Pune',
    price: '1000',
    image: require('@/assets/images/venue2.jpg'),
  },
  {
    id: '3',
    name: 'Box Cricket Zone',
    place: 'Navi Mumbai',
    price: '900',
    image: require('@/assets/images/venue3.jpg'),
  },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const filtered = venues.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search venues..."
        value={search}
        onChangeText={setSearch}
        style={styles.searchBox}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VenueCard
            id={item.id}
            name={item.name}
            place={item.place}
            price={item.price}
            image={item.image}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  searchBox: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
});
