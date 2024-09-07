import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Utils/Colors";
import QRCode from "react-native-qrcode-svg";
import { getData,storeData } from "../Constants/StorageHelper";

export default function ProfileScreen() {
  const [fields, setFields] = useState([]);
  const [showQR, setShowQR] = useState(false);
  const [shortData, setShortData] = useState([]);

  useEffect(() => {
    // Use async/await for fetching data
    const fetchData = async () => {
      const storedData = await getData("0");

      if (storedData !== null) {
        console.log("type ", typeof storedData)
        console.log("parsed data", storedData)
        setFields(storedData);
      } else {
        setFields([
          { id: 1, label: "Name", value: "" },
          { id: 2, label: "Email", value: "" },
          { id: 3, label: "Phone Number", value: "" },
        ]);
      }
    };

    fetchData();
  }, []);

  const addNewField = () => {
    const newFields = [
      ...fields,
      { id: fields.length + 1, label: `Field ${fields.length + 1}`, value: "" },
    ];
    setFields(newFields);
  };

  const handleInputChange = (id, text, fieldLabel) => {
    const updatedFields = fields.map((field) => {
      if (field.id === id) {
        return { ...field, [fieldLabel]: text };
      }
      return field;
    });
    setFields(updatedFields);
  };

  const removeField = (id) => {
    const filteredFields = fields.filter((field) => field.id !== id);
    setFields(filteredFields);
  };

  const saveChanges = async () => {
    try {
      await storeData("0", JSON.stringify(fields));
      Alert.alert(
        "Changes Saved",
        "Your profile has been updated successfully."
      );
    } catch (error) {
      console.error("Error saving data:", error);
      Alert.alert("Error", "Failed to save changes. Please try again.");
    }
  };

  const generateQR = () => {
    setShowQR(!showQR);
    const transformedData = fields
      .filter((field) => field.value.trim() !== "")
      .map((item) => ({ id: item.id, label: item.label, value: item.value }));
    setShortData(transformedData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>My Profile</Text>
        <View style={styles.form}>
          {fields.map((field) => (
            <View style={styles.fieldContainer} key={field.id}>
              <TextInput
                style={styles.label}
                placeholder="Field Name"
                value={field.label}
                onChangeText={(text) =>
                  handleInputChange(field.id, text, "label")
                }
              />
              <Text style={styles.colon}>:</Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                value={field.value}
                onChangeText={(text) =>
                  handleInputChange(field.id, text, "value")
                }
              />
              <TouchableOpacity onPress={() => removeField(field.id)}>
                <Feather name="trash-2" size={20} color={Colors.RED} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={generateQR}>
            <Text style={styles.buttonText}>Generate QR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton} onPress={addNewField}>
            <Text style={styles.buttonText}>
              New Field <Feather name="plus" size={16} color={Colors.WHITE} />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Conditionally render the QR code */}
        <Modal visible={showQR}>
          <View style={styles.qrModalContainer}>
            <Text style={styles.qrHeading}>Your QR</Text>
            <QRCode value={JSON.stringify(shortData)} size={240} />
            <TouchableOpacity
              onPress={() => setShowQR(false)}
              style={styles.goBackButton}>
              <Ionicons name="arrow-back" size={16} color={Colors.WHITE} />
              <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 25,
    color: Colors.PRIMARY,
    textAlign: "center",
    fontFamily: "outfit-bold",
    marginTop: 5,
    marginBottom: 10,
  },
  form: {
    paddingHorizontal: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "outfit",
    borderBottomWidth: 1,
    flex: 1,
    padding: 5,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit",
    borderBottomWidth: 1,
    padding: 5,
    marginHorizontal: 5,
  },
  colon: {
    fontWeight: "bold",
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  saveButton: {
    backgroundColor: Colors.PRIMARY,
    width: 100,
    borderRadius: 99,
    paddingVertical: 15,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: Colors.PRIMARY,
    width: 110,
    borderRadius: 99,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: Colors.WHITE,
  },
  qrModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  qrHeading: {
    fontSize: 28,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
    marginBottom: 20,
    textAlign: "center",
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
  },
});
