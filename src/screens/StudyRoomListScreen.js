// src/screens/StudyRoomListScreen.js
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import BackButton from '../components/BackButton';
import Background from '../components/Background';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';

const StudyRoomListScreen = ({ navigation }) => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const firestore = getFirestore();

    useEffect(() => {
        const fetchRooms = async () => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(collection(firestore, "studyGroups"));
                const fetchedRooms = [];
                querySnapshot.forEach((doc) => {
                    fetchedRooms.push({ id: doc.id, ...doc.data() });
                });
                setRooms(fetchedRooms);
                setError(null);
            } catch (err) {
                setError('Failed to fetch rooms');
                console.error("Error fetching study rooms: ", err);
            }
            setLoading(false);
        };

        fetchRooms();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.itemContainer}
            onPress={() => navigation.navigate('RoomDetails', { roomId: item.id })}
        >
            <Header style={styles.title}>{item.name}</Header>
            <Paragraph>{item.subject}</Paragraph>
            <Paragraph>{item.participants} participants</Paragraph>
        </TouchableOpacity>
    );

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
            <BackButton goBack={navigation.goBack} />
            <FlatList
                data={rooms}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </Background>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    itemContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default StudyRoomListScreen;