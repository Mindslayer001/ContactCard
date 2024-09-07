import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const ProfileView = ({ data, onBack }) => {
  const handleCopyText = (text) => {
    Clipboard.setString(text);
  };

  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
        <Button title="Back" onPress={onBack} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Profile Data</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          {Object.entries(item).map(
            ([key, value]) =>
              key !== "id" && (
                <View key={key} style={styles.entryContainer}>
                  <Text style={styles.label}>{key}: </Text>
                  <TouchableWithoutFeedback
                    onLongPress={() => handleCopyText(value)}
                    onPress={() => handleCopyText(value)}
                  >
                    <View style={styles.valueContainer}>
                      <Text style={styles.value}>{value}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              )
          )}
        </View>
      ))}
      <TouchableOpacity
        onPress={onBack}
        style={styles.goBackButton}
      >
        <Ionicons name="arrow-back" size={16} color={Colors.WHITE} />
        <Text style={styles.goBackText}>Go Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  noDataText: {
    textAlign: "center",
    fontSize: 18,
    color: Colors.GRAY,
  },
  itemContainer: {
    marginBottom: 10,
  },
  entryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  label: {
    fontFamily: "outfit-med",
    fontSize: 18,
    marginRight: 5,
  },
  valueContainer: {
    flex: 1,
  },
  value: {
    fontFamily: "outfit",
    fontSize: 18,
    flexWrap: "wrap",
  },
  goBackButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 99,
    marginTop: 10,
    width: 130,
    alignSelf: 'center',
  },
  goBackText: {
    fontSize: 16,
    fontFamily: "outfit-med",
    color: Colors.WHITE,
  },
});

export default ProfileView;
