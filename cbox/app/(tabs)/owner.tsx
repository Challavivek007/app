import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function OwnerScreen() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    pricePerHour: '',
    sqft: '',
    openingTime: '',
    closingTime: '',
    upiId: '',
  });

  const [images, setImages] = useState<string[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages([...images, ...uris]);
    }
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    console.log('Selected Images:', images);
    // Here you can send data to your backend
    alert('Form Submitted Successfully!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Box Cricket Owner Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Owner Name"
        placeholderTextColor="#888"
        value={formData.name}
        onChangeText={text => handleInputChange('name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#888"
        keyboardType="phone-pad"
        value={formData.mobile}
        onChangeText={text => handleInputChange('mobile', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={text => handleInputChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Price Per Hour (₹)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={formData.pricePerHour}
        onChangeText={text => handleInputChange('pricePerHour', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Size (Sqft)"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={formData.sqft}
        onChangeText={text => handleInputChange('sqft', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="UPI ID"
        placeholderTextColor="#888"
        value={formData.upiId}
        onChangeText={text => handleInputChange('upiId', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Opening Time (e.g., 09:00 AM)"
        placeholderTextColor="#888"
        value={formData.openingTime}
        onChangeText={text => handleInputChange('openingTime', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Closing Time (e.g., 10:00 PM)"
        placeholderTextColor="#888"
        value={formData.closingTime}
        onChangeText={text => handleInputChange('closingTime', text)}
      />

      <TouchableOpacity style={styles.imagePickerButton} onPress={pickImages}>
        <Text style={styles.imagePickerText}>Pick Box Cricket Photos</Text>
      </TouchableOpacity>

      <View style={styles.imagePreviewContainer}>
        {images.map((uri, index) => (
          <Image
            key={index}
            source={{ uri }}
            style={styles.previewImage}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Details</Text>
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
    color: '#111827',
    backgroundColor: '#f9fafb',
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  previewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 5,
  },
  submitButton: {
  backgroundColor: '#34D399',
  paddingVertical: 12,
  paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
},
submitButtonText: {
  color: '#ffffff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
