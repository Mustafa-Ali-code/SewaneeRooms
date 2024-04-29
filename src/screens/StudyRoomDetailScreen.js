import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { joinRoom, leaveRoom } from '../api/studyRoomService';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Button from '../components/Button';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';

const StudyRoomDetailScreen = ({ route, navigation }) => {
    const { roomId } = route.params;
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const firestore = getFirestore();

    // Define userId from the currently logged-in user
    const userId = auth.currentUser ? auth.currentUser.uid : null;

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const docRef = doc(firestore, "studyGroups", roomId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setRoom(docSnap.data());
                } else {
                    console.log("No such document!");
                    setError('No room details available.');
                }
            } catch (err) {
                console.error("Error fetching room details: ", err);
                setError('Failed to fetch room details.');
            }
            setLoading(false);
        };

        fetchRoomDetails();
    }, [roomId]);

    if (loading) {
        return <Background><ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" /></Background>;
    }

    if (error) {
        return (
            <Background>
                <View style={styles.container}>
                    <Paragraph>{error}</Paragraph>
                </View>
            </Background>
        );
    }

    return (
        <Background>
            <ScrollView contentContainerStyle={styles.container}>
                <BackButton goBack={navigation.goBack} />
                {room ? (
                    <>
                        <Header>{room.name}</Header>
                        <Paragraph>Subject: {room.subject}</Paragraph>
                        <Paragraph>Description: {room.description}</Paragraph>
                        <Paragraph>Participants: {room.participants.length}</Paragraph>
                        {userId ? (
                            <>
                                <Button mode="contained" onPress={() => joinRoom(userId, roomId)}>Join Room</Button>
                                <Button mode="contained" onPress={() => leaveRoom(userId, roomId)}>Leave Room</Button>
                            </>
                        ) : (
                            <Paragraph>Please log in to join or leave the room.</Paragraph>
                        )}
                    </>
                ) : (
                    <Paragraph>No room details available.</Paragraph>
                )}
            </ScrollView>
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
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default StudyRoomDetailScreen;