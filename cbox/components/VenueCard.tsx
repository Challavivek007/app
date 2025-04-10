import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  id: string;
  name: string;
  image: any;
  place: string;
  price: string;
};

export default function VenueCard({ id, name, image, place, price }: Props) {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push({pathname: '/venue/[id]' , params:{id:`${id}`}})}>
      <View style={styles.card}>
        <Image source={image} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.place}>{place}</Text>
          <Text style={styles.price}>₹{price} / hour</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  place: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  price: {
    fontSize: 16,
    color: '#2e64e5',
    marginTop: 8,
  },
});
