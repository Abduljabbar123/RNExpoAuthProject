import { Colors } from "@/constants/Colors";
import { AppStrings } from "@/constants/AppStrings";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface HeaderProps {
  title: string;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, onSignOut }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.button} onPress={onSignOut}>
        <Text style={styles.buttonText}>{AppStrings.Dashboard.signOut}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: Colors.whiteFamily.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.greyFamily.borderGrey,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.blackFamily.black,
  },
  button: {
    backgroundColor: Colors.blueFamily.primaryBlue,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.whiteFamily.white,
    fontSize: 14,
    fontWeight: "bold",
  },
});
