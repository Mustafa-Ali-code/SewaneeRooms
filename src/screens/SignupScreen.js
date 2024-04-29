// src/screens/SignupScreen.js
import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../firebaseConfig';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import BackButton from '../components/BackButton'
import Background from '../components/Background'
import Button from '../components/Button'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Paragraph from '../components/Paragraph'
import TextInput from '../components/TextInput'

// Validation Schema using Yup
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short - should be 6 chars minimum.')
    .required('Password is required'),
  major: Yup.string().required('Major is required'),
  yearOfStudy: Yup.string().required('Year of study is required'),
  interests: Yup.string().required('Interests are required'),
});

const handleSignup = async (values, navigation) => {
  try {
    const { email, password, fullName, major, yearOfStudy, interests } = values;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    console.log("Verification email sent");

    // Store additional data in Firestore
    const userDocRef = doc(db, "users", userCredential.user.uid);
    await setDoc(userDocRef, {
      fullName,
      major,
      yearOfStudy,
      interests,
      joinedRooms: []  // Initialize joinedRooms as an empty array
    });

    // Inform the user to verify their email and navigate them to the VerificationScreen
    alert('Account created successfully! Please verify your email.');
    navigation.navigate('Verification'); // Navigate directly to VerificationScreen

  } catch (error) {
    // Handle errors (e.g., display an error message)
    console.error("Signup error:", error);
    alert('Failed to create account. Please try again.');
  }
};

const SignupScreen = ({ navigation }) => {
  return (
    <Background>
      <ScrollView contentContainerStyle={styles.container}>
        <BackButton goBack={navigation.goBack} />
        <Logo />
        <Header>Create Account</Header>
        <Formik
          initialValues={{ fullName: '', email: '', password: '', major: '', yearOfStudy: '', interests: '' }}
          validationSchema={SignupSchema}
          onSubmit={values => handleSignup(values, navigation)}
          >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <TextInput
                label="Full Name"
                onChangeText={handleChange('fullName')}
                onBlur={handleBlur('fullName')}
                value={values.fullName}
                error={touched.fullName && errors.fullName}
                errorText={errors.fullName}
              />
              
              <TextInput
                label="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                error={touched.email && errors.email}
                errorText={errors.email}
              />

              <TextInput
                label="Password"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                error={touched.password && errors.password}
                errorText={errors.password}
                secureTextEntry
              />

              <TextInput
                label="Major"
                onChangeText={handleChange('major')}
                onBlur={handleBlur('major')}
                value={values.major}
                error={touched.major && errors.major}
                errorText={errors.major}
              />

              <TextInput
                label="Year of Study"
                onChangeText={handleChange('yearOfStudy')}
                onBlur={handleBlur('yearOfStudy')}
                value={values.yearOfStudy}
                error={touched.yearOfStudy && errors.yearOfStudy}
                errorText={errors.yearOfStudy}
              />

              <TextInput
                label="Interests"
                onChangeText={handleChange('interests')}
                onBlur={handleBlur('interests')}
                value={values.interests}
                error={touched.interests && errors.interests}
                errorText={errors.interests}
              />

              <Button mode="contained" onPress={handleSubmit}>
                Sign Up
              </Button>

              <Button mode="text" onPress={() => navigation.navigate('Login')}>
                Go back to Login
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SignupScreen;