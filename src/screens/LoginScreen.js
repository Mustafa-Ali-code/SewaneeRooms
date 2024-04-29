// src/screens/LoginScreen.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from "firebase/auth";
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';


// Validation Schema using Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

const handleLogin = async (email, password, setFieldError, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    if (userCredential.user.emailVerified) {
      // Email is verified
      console.log("Login successful.");
      navigate('Home'); // Navigate to the main part of the app
    } else {
      // If email is not verified
      console.log("User needs to verify email.");
      navigate('Verification'); // Navigate directly to VerificationScreen
    }
  } catch (error) {
    console.error("Login error: ", error);
    if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
      setFieldError('email', "Invalid email or password.");
    } else {
      setFieldError('email', "Failed to login. Please try again.");
    }
  }
};

const LoginScreen = ({ navigation }) => {
  return (
    <Background>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setFieldError }) => {
          handleLogin(values.email, values.password, setFieldError, navigation.navigate);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.container}>
            <Logo />
            <Header>Login</Header>
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
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              error={touched.password && errors.password}
              errorText={errors.password}
            />
            {errors.email && <Paragraph style={styles.errorText}>{errors.email}</Paragraph>}
            <Button mode="contained" onPress={handleSubmit}>Login</Button>
            <Button mode="text" onPress={() => navigation.navigate('SignUp')}>Go to Signup</Button>
          </View>
        )}
      </Formik>
    </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;