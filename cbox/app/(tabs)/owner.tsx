import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function OwnerScreen() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    place: '',
    price: '',
    sqft: '',
    openingTime: '',
    closingTime: '',
    upiId: '',
  });

  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Image Required', 'Please select a venue image.');
      return;
    }

    if (!location) {
      Alert.alert('Location Required', 'Unable to fetch location.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload image to server
      const formDataImage = new FormData();
      const filename = image.split('/').pop();
      const match = /\.(\w+)$/.exec(filename || '');
      const type = match ? `image/${match[1]}` : `image`;

      formDataImage.append('image', {
        uri: image,
        name: filename,
        type,
      } as any);

      const uploadRes = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formDataImage,
      });

      const uploadData = await uploadRes.json();
      const uploadedImageUrl = uploadData.imageUrl;

      const payload = {
        ...formData,
        price: parseFloat(formData.price),
        sqft: formData.sqft ? parseFloat(formData.sqft) : undefined,
        image: uploadedImageUrl,
        location: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude],
        },
      };

      const res = await fetch('http://localhost:3000/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (res.ok) {
        Alert.alert('Success', 'Venue added successfully!');
        setFormData({
          name: '',
          mobile: '',
          email: '',
          place: '',
          price: '',
          sqft: '',
          openingTime: '',
          closingTime: '',
          upiId: '',
        });
        setImage(null);
      } else {
        Alert.alert('Error', result.error || 'Failed to add venue.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Something went wrong during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Box Cricket Owner Details</Text>

      {['name', 'mobile', 'email', 'place', 'price', 'sqft', 'upiId', 'openingTime', 'closingTime'].map(field => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace(/([A-Z])/g, ' $1')}
          placeholderTextColor="#888"
          keyboardType={['mobile', 'price', 'sqft'].includes(field) ? 'numeric' : 'default'}
          value={(formData as any)[field]}
          onChangeText={text => handleInputChange(field, text)}
        />
      ))}

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerText}>{image ? 'Change Image' : 'Pick Venue Image'}</Text>
      </TouchableOpacity>

      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.previewImage} />
          <TouchableOpacity style={styles.deleteIcon} onPress={() => setImage(null)}>
            <Ionicons name="trash" size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.submitButtonText}>{isSubmitting ? 'Submitting...' : 'Submit Details'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#cbd5e0',
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9fafb',
    color: '#111827',
  },
  imagePickerButton: {
    backgroundColor: '#34D399',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  imagePickerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  previewImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  deleteIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    padding: 3,
  },
  submitButton: {
    backgroundColor: '#34D399',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
