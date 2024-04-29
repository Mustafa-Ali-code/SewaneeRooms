// src/api/studyRoomService.js
import { getFirestore, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { auth } from '../firebaseConfig'; // Correct this path to where your `firebaseConfig` is located

const firestore = getFirestore();

// Function to join a room
export const joinRoom = async (userId, roomId) => {
    const roomRef = doc(firestore, "studyGroups", roomId);
    const userRef = doc(firestore, "users", userId);

    try {
        // Add userId to the participants array in the room document
        await updateDoc(roomRef, {
            participants: arrayUnion(userId)
        });
        // Add roomId to the joinedRooms array in the user document
        await updateDoc(userRef, {
            joinedRooms: arrayUnion(roomId)
        });
        alert('You have joined the room successfully!');
    } catch (error) {
        console.error("Error joining room: ", error);
        alert('Failed to join the room.');
    }
};

// Function to leave a room
export const leaveRoom = async (userId, roomId) => {
    const roomRef = doc(firestore, "studyGroups", roomId);
    const userRef = doc(firestore, "users", userId);

    try {
        // Remove userId from the participants array in the room document
        await updateDoc(roomRef, {
            participants: arrayRemove(userId)
        });
        // Remove roomId from the joinedRooms array in the user document
        await updateDoc(userRef, {
            joinedRooms: arrayRemove(roomId)
        });
        alert('You have left the room successfully!');
    } catch (error) {
        console.error("Error leaving room: ", error);
        alert('Failed to leave the room.');
    }
};