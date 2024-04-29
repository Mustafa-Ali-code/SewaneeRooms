import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Logo from '../components/Logo';
import TextInput from '../components/TextInput';

const EditProfileScreen = ({ navigation }) => {
    const [fullName, setFullName] = useState('');
    const [major, setMajor] = useState('');
    const [yearOfStudy, setYearOfStudy] = useState('');
    const [interests, setInterests] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setFullName(data.fullName || '');
                setMajor(data.major || '');
                setYearOfStudy(data.yearOfStudy || '');
                setInterests(data.interests || '');
            }
        };
        fetchData();
    }, []);

    const handleSave = async () => {
        try {
            // Update Firebase Auth profile (if needed)
            await updateProfile(auth.currentUser, {
                displayName: fullName
            });

            // Update Firestore document
            const userDocRef = doc(db, "users", auth.currentUser.uid);
            await updateDoc(userDocRef, {
                fullName,
                major,
                yearOfStudy,
                interests
            });

            alert('Profile updated successfully!');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating profile: ', error);
            alert('Failed to update profile.');
        }
    };

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton goBack={navigation.goBack} />
                <Logo />
                <Header>Edit Profile</Header>
                <TextInput
                    label="Full Name"
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Enter your full name"
                />
                <TextInput
                    label="Major"
                    value={major}
                    onChangeText={setMajor}
                    placeholder="Enter your major"
                />
                <TextInput
                    label="Year of Study"
                    value={yearOfStudy}
                    onChangeText={setYearOfStudy}
                    placeholder="Enter your year of study"
                />
                <TextInput
                    label="Interests"
                    value={interests}
                    onChangeText={setInterests}
                    placeholder="Enter your interests"
                />
                <Button mode="contained" onPress={handleSave}>Save Changes</Button>
            </ScrollView>
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
});

export default EditProfileScreen;
