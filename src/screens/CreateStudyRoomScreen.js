// src/screens/CreateRoomScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';
import TextInput from '../components/TextInput';

const CreateStudyRoomScreen = ({ navigation }) => { // Accept navigation prop here
    const [roomData, setRoomData] = useState({
      name: '',
      subject: '',
      description: '',
    });
  
    const firestore = getFirestore();
  
    const handleInputChange = (name, value) => {
      setRoomData({ ...roomData, [name]: value });
    };
  
    const handleCreateRoom = async () => {
      if (!roomData.name || !roomData.subject || !roomData.description) {
        alert('Please fill all fields');
        return;
      }
    
      try {
        await addDoc(collection(firestore, "studyGroups"), {
          ...roomData,
          createdBy: auth.currentUser.uid, // Save the user who created the room
          createdAt: new Date(),
          participants: [auth.currentUser.uid] // Initialize participants with the creator's UID
        });
        alert('Study room created successfully');
        navigation.goBack(); // Navigate back after creation
      } catch (error) {
        console.error("Error adding document: ", error);
        alert('Error creating room');
      }
    };
        
    return (
      <Background>
        <ScrollView contentContainerStyle={styles.container}>
          <BackButton goBack={navigation.goBack} />
          <Logo />
          <Header>Create a Study Room</Header>
          <TextInput
            label="Room Name"
            value={roomData.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            label="Subject"
            value={roomData.subject}
            onChangeText={text => handleInputChange('subject', text)}
          />
          <TextInput
            label="Description"
            value={roomData.description}
            onChangeText={text => handleInputChange('description', text)}
          />
          <Button mode="contained" onPress={handleCreateRoom}>Create Room</Button>
        </ScrollView>
      </Background>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
  });
  
  export default CreateStudyRoomScreen;  