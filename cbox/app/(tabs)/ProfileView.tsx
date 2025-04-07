import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProfileView() {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [phone, setPhone] = useState('1234567890');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [editingPhone, setEditingPhone] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const phoneInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);

  const pickImage = async () => {
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
    setEditingPhone(false);
    setEditingEmail(false);
    setIsEdited(false);
    Alert.alert('Saved', 'Your changes have been saved!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>

        {/* Profile Image */}
        <View style={styles.imageEditContainer}>
          <TouchableOpacity onPress={pickImage}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.profileImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={{ color: '#888' }}>Upload Photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Name (centered and bold below image) */}
        <Text style={styles.name}>{name}</Text>

        {/* Phone */}
        <View style={styles.editRow}>
          <TextInput
            ref={phoneInputRef}
            style={[
              styles.input,
              !editingPhone && styles.disabledInput,
              editingPhone && styles.activeInput,
            ]}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setIsEdited(true);
            }}
            editable={editingPhone}
            keyboardType="phone-pad"
            placeholder="Phone Number"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => {
              setEditingPhone(true);
              setTimeout(() => {
                phoneInputRef.current?.focus();
              }, 100);
            }}
          >
            <MaterialIcons name="edit" size={24} color="#4B5563" />
          </TouchableOpacity>
        </View>

        {/* Email */}
        <View style={styles.editRow}>
          <TextInput
            ref={emailInputRef}
            style={[
              styles.input,
              !editingEmail && styles.disabledInput,
              editingEmail && styles.activeInput,
            ]}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setIsEdited(true);
            }}
            editable={editingEmail}
            keyboardType="email-address"
            placeholder="Email Address"
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity
            onPress={() => {
              setEditingEmail(true);
              setTimeout(() => {
                emailInputRef.current?.focus();
              }, 100);
            }}
          >
            <MaterialIcons name="edit" size={24} color="#4B5563" />
          </TouchableOpacity>
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
  },
  imageEditContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#34D399',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    backgroundColor: '#34D399',
    borderRadius: 15,
    padding: 5,
    elevation: 5,
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
    marginRight: 10,
  },
  disabledInput: {
    color: 'black',
  },
  activeInput: {
    backgroundColor: 'lightgray',
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
