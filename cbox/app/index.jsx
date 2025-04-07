import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/register');
        }
      } catch (err) {
        console.error('Error checking login:', err);
        router.replace('/register');
      }
    };

    checkLogin();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#34D399" />
    </View>
  );
}
