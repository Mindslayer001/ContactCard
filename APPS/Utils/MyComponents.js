import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const MyComponent = ({ user }) => {
  const [userInfo, setUserInfo] = useState({
    userName: 'User Name',
    photoURL: 'https://via.placeholder.com/100',
    phoneNumber: 'Phone Number'
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        userName: user.displayName || 'User Name',
        photoURL: user.photoURL || 'https://via.placeholder.com/100',
        phoneNumber: user.phoneNumber || 'Phone Number'
      });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name: {userInfo.userName}</Text>
      <Image source={{ uri: userInfo.photoURL }} style={styles.image} />
      <Text style={styles.text}>Phone: {userInfo.phoneNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 16,
    fontFamily: 'outfit', // Make sure this font is available or define a fallback
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
    backgroundColor: '#ddd', // Fallback color for image loading
  },
});

export default MyComponent;
