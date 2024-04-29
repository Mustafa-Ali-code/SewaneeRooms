// src/screens/HomeScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({ navigation }) => {
  const [studyGroups, setStudyGroups] = useState([]);
  const firestore = getFirestore();

  const fetchStudyGroups = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "studyGroups"));
      const groups = [];
      querySnapshot.forEach((doc) => {
        groups.push({ id: doc.id, ...doc.data() });
      });
      setStudyGroups(groups);
    } catch (error) {
      console.error("Error fetching study groups: ", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudyGroups();
    }, [])
  );

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <Background>
      <Logo />
      <Header>Welcome to SewaneeRooms!</Header>
      <Button mode="contained" onPress={handleSignOut}>Sign Out</Button>
      <Button mode="contained" onPress={() => navigation.navigate('Profile')}>Go to Profile</Button>
      <Button mode="contained" onPress={() => navigation.navigate('StudyRoomList')}>View Study Room List</Button>
      <FlatList
        data={studyGroups}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.groupItem}
            onPress={() => { /* Navigate to group details or join group */ }}
          >
            <Header style={styles.groupTitle}>{item.name}</Header>
            <Paragraph>{item.subject} - Participants: {item.participants}</Paragraph>
          </TouchableOpacity>
        )}
      />

      <Button mode="contained" onPress={() => navigation.navigate('CreateStudyRoom')}>Create Study Group</Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  groupItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10, // Added margin for visual spacing between items
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;