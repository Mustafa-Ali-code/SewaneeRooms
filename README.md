# SewaneeRooms

## Overview
SewaneeRooms is a mobile application designed to help students at Sewanee University find and participate in study groups on campus. It provides features such as room creation, profile management, and real-time location-based study room listings.

## Features
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Email Verification**: Ensure that all user accounts are verified via email.
- **Study Room Management**: Users can create, join, or leave study rooms.
- **Real-Time Updates**: Users receive updates on rooms they've joined or are interested in.
- **Location Services**: View study rooms available around the campus on a map.

## Tech Stack
- **React Native**: For building the mobile application.
- **Firebase**: For authentication, database management, and hosting.
- **React Navigation**: Used for managing navigation between different screens.

## Setup
To run SewaneeRooms on your local machine, follow these steps:

### Prerequisites
- Node.js
- npm or yarn
- React Native CLI
- An Android or iOS device or emulator

### Installation
1. **Clone the repository**
   git clone https://github.com/yourgithub/sewaneerooms.git
   cd sewaneerooms
2. **Install dependencies**
     ```
     npm install
     ```
    or

      ```
     yarn install
      ```
3. **Set up Firebase**
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Add your app's Firebase configuration to `src/firebaseConfig.js`
4. **Run the Application**
- For Android:
  ```
  npx react-native run-android
  ```
- For iOS:
  ```
  cd ios && pod install && cd ..
  npx react-native run-ios
  ```

## Usage

### Sign Up
Create a new account and verify your email to get started.

### Log In
Log into the app using your credentials.

### Create/Join Study Rooms
Use the 'Create Study Room' feature to set up a new room or join existing ones through the 'Study Room List'.

### Manage Profile
Update your profile information in the 'Profile' section.

### Explore Map
Use the 'Map' feature to find study rooms around the campus.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
