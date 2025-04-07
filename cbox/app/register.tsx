import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
    }
  };

  const sendOtp = () => {
    const newOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(newOtp);
    Alert.alert('OTP Sent', `Your OTP is ${newOtp}`);
  };

  const verifyOtp = async () => {
    if (otp === generatedOtp) {
      try {
        const user = { name, email, phone };
        await AsyncStorage.setItem('user', JSON.stringify(user));
        Alert.alert('Success', 'OTP Verified Successfully!');
        router.replace('/(tabs)'); // redirect to home
      } catch (err) {
        Alert.alert('Error', 'Something went wrong saving your data.');
        console.error('AsyncStorage error:', err);
      }
    } else {
      Alert.alert('Error', 'Incorrect OTP. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{ color: '#888' }}>Upload Photo</Text>
              </View>
            )}
            {/* '+' Button Overlay */}
            <View style={styles.plusButton}>
              <Text style={styles.plusText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>Create Your Profile</Text>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#888"
          value={name}
          onChangeText={setName}
        />

        {/* Email Input */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Phone Input */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        {/* Send OTP Button */}
        <TouchableOpacity style={styles.button} onPress={sendOtp}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>

        {/* OTP Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />

        {/* Verify OTP Button */}
        <TouchableOpacity style={[styles.button, { backgroundColor: '#34D399' }]} onPress={verifyOtp}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'black', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  card: {
    backgroundColor: '#ffffff',
    width: '85%',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
    marginTop: 10,
  },
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    borderWidth: 2,
    borderColor: '#34D399',
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusButton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    backgroundColor: '#3B82F6',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  plusText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: -2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1f2937',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#f9fafb',
  },
  button: {
    backgroundColor: '#34D399',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
