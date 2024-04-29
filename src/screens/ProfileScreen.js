import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import Paragraph from '../components/Paragraph';

const ProfileScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserInfo(docSnap.data());
        } else {
          console.log("No such document!");
          setUserInfo({});
        }
      };

      fetchUserData();
    }
  }, [user]); // This depends on `user` being not null

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Profile</Header>
        {userInfo ? (
          <>
            <Paragraph>Email: {user.email}</Paragraph>
            <Paragraph>Full Name: {userInfo.fullName}</Paragraph>
            <Paragraph>Major: {userInfo.major}</Paragraph>
            <Paragraph>Year of Study: {userInfo.yearOfStudy}</Paragraph>
            <Paragraph>Interests: {userInfo.interests}</Paragraph>
          </>
        ) : (
          <Paragraph>Loading...</Paragraph>
        )}
        <Button mode="contained" onPress={() => navigation.navigate('EditProfile')}>Edit Profile</Button>
        <Button mode="contained" onPress={handleSignOut}>Sign Out</Button>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 30,
  },
});

export default ProfileScreen;