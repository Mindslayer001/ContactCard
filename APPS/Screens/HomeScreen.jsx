import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, ActivityIndicator } from "react-native";
import Header from "../Components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../Utils/Colors";
import { getAllKeys, getMultiple, removeValue } from "../Constants/StorageHelper";
import { useFocusEffect } from "@react-navigation/native";

export default function HomePage() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [personData, setProfileData] = useState(null);
  const [storedData, setStoredData] = useState([]);
  const [currentProfileKey, setCurrentProfileKey] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data function
  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const keys = await getAllKeys();  // Get keys from AsyncStorage
      if (keys.length > 0) {
        const totalData = await getMultiple(keys); // Retrieve all data
        setStoredData(totalData); // Update the state with the retrieved data
      } else {
        setStoredData([]); // If no keys are found, set to an empty array
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getData(); // Fetch data when screen is focused
    }, [getData])
  );

  const handleProfile = (person, key) => {
    setModalVisible(true);
    setProfileData(person);
    setCurrentProfileKey(key); // Store the key instead of the index
  };

  const deleteProfile = async (key) => {
    setLoading(true);
    try {
      await removeValue(key); // Remove from AsyncStorage
      await getData(); // Refresh the stored data
      setModalVisible(false); // Close modal after deletion
    } catch (error) {
      console.error("Error deleting profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
        ) : (
          storedData.map(([key, personFields]) => (
            Array.isArray(personFields) && (
              <TouchableOpacity key={key} onPress={() => handleProfile(personFields, key)}>
                <View style={styles.card}>
                  {personFields.map((field) => (
                    field.label && field.value ? (
                      <Text key={field.id} style={styles.nameText}>
                        {field.label}: {field.value}
                      </Text>
                    ) : null
                  ))}
                </View>
              </TouchableOpacity>
            )
          ))
        )}

        <Modal visible={isModalVisible} animationType="slide">
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.heading}>Profile Data</Text>
            {personData &&
              Array.isArray(personData) &&
              personData.map((field) => (
                field.label && (
                  <View key={field.id} style={styles.profileItem}>
                    <Text style={styles.label}>{field.label}:</Text>
                    <Text style={styles.value}>{field.value}</Text>
                  </View>
                )
              ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.goBackButton}>
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteProfile(currentProfileKey)} style={styles.goBackButton}>
              <Text style={styles.buttonText}>Delete Profile</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    marginHorizontal: 15,
  },
  card: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    padding: 20,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 25,
    color: Colors.PRIMARY,
    textAlign: "center",
    fontFamily: "outfit-bold",
    marginTop: 5,
    marginBottom: 10,
  },
  profileItem: {
    marginLeft: 20,
    margin: 7,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit",
    padding: 5,
    marginHorizontal: 5,
  },
  value: {
    fontSize: 16,
    fontFamily: "outfit",
    padding: 5,
    marginHorizontal: 5,
    borderBottomWidth: 1,
  },
  goBackButton: {
    backgroundColor: Colors.PRIMARY,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 99,
    marginTop: 10,
    width: 130,
    marginLeft: 20,
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "outfit-med",
    color: Colors.WHITE,
  },
});
