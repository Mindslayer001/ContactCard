import React from 'react';
import { View, Text } from 'react-native';
import ProfileInterface from '@/constants/profile'; // Adjust the path based on your project structure

const Profiles: React.FC<{ profile: ProfileInterface }> = ({ profile }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      {Object.entries(profile).map(([key, value]) => (
        <Text key={key}>{`${key}: ${value}`}</Text>
      ))}
    </View>
  );
};

export default Profiles;