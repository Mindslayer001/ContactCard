import React from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Colors from "../Utils/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = ({ userDetail, onLogout }) => {
  return (
    <View>
        <View style={styles.container}>
          <Image
            source={{ uri: 'https://i.pinimg.com/736x/70/2a/de/702adeb712a4c8f5a347f93c7792fde6.jpg' }}
            style={styles.image}
          />
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
            <Text style={styles.usernameText}>{"Mr.No Name"}</Text>
          </View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity onPress={onLogout} style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>LogOut</Text>
            </TouchableOpacity>
          </View>
        </View>
      <View style={styles.input}>
        <Ionicons name="search" size={24} color={Colors.GRAY} />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 99,
  },
  welcomeContainer: {
    flex: 1,
    marginLeft: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontFamily: "outfit",
  },
  usernameText: {
    fontSize: 20,
    color: Colors.PRIMARY,
    fontFamily: "outfit-bold",
  },
  logoutContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: Colors.PRIMARY,
    width: 70,
    padding: 10,
    borderRadius: 99,
    alignItems: "center",
  },
  logoutButtonText: {
    color: Colors.WHITE,
    fontFamily: "outfit",
  },
  input: {
    backgroundColor: Colors.WHITE,
    padding: 10,
    borderRadius: 99,
    paddingHorizontal: 20,
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.7,
    borderColor: Colors.PRIMARY,
  },
  searchInput: {
    width: "100%",
    fontSize: 16,
    fontFamily: "outfit-med",
    marginLeft: 7,
  },
});

export default Header;
