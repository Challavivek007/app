import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileView() {
  const [name, setName] = useState('Challa Vivek');
  const [email, setEmail] = useState('challavivekreddy24@gmail.com');
  const [phone, setPhone] = useState('9666123743');
  const [address, setAddress] = useState('123 Main Street, City');

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const addressInputRef = useRef<TextInput>(null);

  const pickImage = async () => {
    if (!isEditing) return; // Allow picking image only when editing
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setIsEdited(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    setIsEdited(false);
    Alert.alert('Saved', 'Your changes have been saved!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>

        {/* Single Edit Icon */}
        <TouchableOpacity style={styles.topEditIcon} onPress={() => setIsEditing(!isEditing)}>
          <MaterialIcons name={isEditing ? 'close' : 'edit'} size={28} color="#4B5563" />
        </TouchableOpacity>

        {/* Profile Image */}
        <TouchableOpacity onPress={pickImage}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profileImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Text style={{ color: '#888' }}>Upload Photo</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Name (Non-editable) */}
        <Text style={styles.name}>{name}</Text>

        {/* Phone */}
        <View style={styles.editRow}>
          <TextInput
            ref={phoneInputRef}
            style={[
              styles.input,
              isEditing ? styles.activeInput : styles.disabledInput,
            ]}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setIsEdited(true);
            }}
            editable={isEditing}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Email */}
        <View style={styles.editRow}>
          <TextInput
            ref={emailInputRef}
            style={[
              styles.input,
              isEditing ? styles.activeInput : styles.disabledInput,
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setIsEdited(true);
            }}
            editable={isEditing}
            keyboardType="email-address"
            placeholder="Email Address"
            placeholderTextColor="#aaa"
          />
        </View>

        {/* Address */}
        <View style={styles.editRow}>
          <TextInput
            ref={addressInputRef}
            style={[
              styles.input,
              isEditing ? styles.activeInput : styles.disabledInput,
            ]}
            value={address}
            onChangeText={(text) => {
              setAddress(text);
              setIsEdited(true);
            }}
            editable={isEditing}
            placeholder="Address"
            placeholderTextColor="#aaa"
            multiline
          />
        </View>

        {/* Save Button */}
        {isEdited && (
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        {/* Options */}
        <View style={styles.optionsContainer}>
          <Text style={styles.optionTitle}>Options</Text>

          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Help & Support</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
    flexGrow: 1,
    alignItems: 'center',
  },
  profileContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'relative',
  },
  topEditIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    padding: 8,
    zIndex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#34D399',
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  disabledInput: {
    backgroundColor: 'white',
    color: 'black',
  },
  activeInput: {
    backgroundColor: 'lightgray',
    color: 'black',
  },
  button: {
    backgroundColor: '#34D399',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  optionsContainer: {
    width: '100%',
    marginTop: 20,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
  },
  optionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
  },
});
