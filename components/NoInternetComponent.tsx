import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import TextComponent from "@/components/TextComponent";
import { AppStrings } from "@/constants/AppStrings";
import { AppStyles } from "@/constants/AppStyles";

const NoInternetComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle={"dark-content"} />
      <TextComponent title={AppStrings.Error.noInternet} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // ...AppStyles.mainContainer,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoInternetComponent;
