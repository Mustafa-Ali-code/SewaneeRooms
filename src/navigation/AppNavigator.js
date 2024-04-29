import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerificationScreen from '../screens/VerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateStudyRoomScreen from '../screens/CreateStudyRoomScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import MapScreen from '../screens/MapScreen';
import StudyRoomListScreen from '../screens/StudyRoomListScreen';
import StudyRoomDetailScreen from '../screens/StudyRoomDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsVerified(user ? user.emailVerified : false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && isVerified ? (
        // Authenticated and verified user screens
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreateStudyRoom" component={CreateStudyRoomScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Map" component={MapScreen} />
          <Stack.Screen name="StudyRoomList" component={StudyRoomListScreen} />
          <Stack.Screen name="RoomDetails" component={StudyRoomDetailScreen} />
        </>
      ) : (
        // Non-authenticated or not verified user screens
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignupScreen} />
          {isAuthenticated ? (
            <Stack.Screen name="Verification" component={VerificationScreen} />
          ) : null}
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;