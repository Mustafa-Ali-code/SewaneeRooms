import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { auth } from '../firebaseConfig'; // Make sure this path is correct
import Background from '../components/Background';

const VerificationScreen = ({ navigation }) => {
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          clearInterval(intervalId);
          alert('Email verified! You can now use the app.');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Updated route name to 'Home'
          });
        }
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.replace('Login'); // Redirect to login screen
    }).catch((error) => {
      alert('Error signing out: ' + error.message);
    });
  };

  const handleCheckNow = () => {
    setChecking(true);
    auth.currentUser.reload().then(() => {
      setChecking(false);
      if (auth.currentUser.emailVerified) {
        alert('Email verified! You can now use the app.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }], // Updated route name to 'Home'
        });
      } else {
        alert('Email not yet verified. Please check your email.');
      }
    }).catch((error) => {
      setChecking(false);
      alert('Failed to reload user data: ' + error.message);
    });
  };

  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.text}>Please verify your email to continue using the app. Check your email inbox for the verification link.</Text>
      {checking ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Check Verification Status" onPress={handleCheckNow} />
      )}
      <Button title="Sign Out" onPress={handleSignOut} color="red" />
    </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default VerificationScreen;