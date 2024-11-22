import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {  AppFonts } from "@/constants/AppConstants";
import { Colors } from "@/constants/Colors";

interface Props {
  title?: string;
  boldText?: string;
  txtStyle?: any;
  simpleText?: any;
  numberOfLines?: any;
  onPressText?: any;
}
export default function PaymentMethodTextComponent(props: Props) {
  return (
    <View>
      {props.title && (
        <Text
          onPress={props?.onPressText}
          numberOfLines={props.numberOfLines}
          style={[styles.title, props.txtStyle]}
        >
          {props.title}
        </Text>
      )}
      {props.boldText && (
        <Text
          onPress={props?.onPressText}
          numberOfLines={props.numberOfLines}
          style={[styles.boldText, props.txtStyle]}
        >
          {props.boldText}
        </Text>
      )}
      {props.simpleText && (
        <Text
          onPress={props?.onPressText}
          numberOfLines={props.numberOfLines}
          style={[styles.simpleText, props.txtStyle]}
        >
          {props.simpleText}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontFamily: AppFonts.RubikBold,
    color: Colors.blackFamily.black,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 16,
  },
  boldText: {
    fontFamily: AppFonts.RubikMedium,
    color: Colors.blueFamily.primaryBlue,
    fontSize: 14,
  },
  simpleText: {
    fontFamily: AppFonts.RubikRegular,
    color: Colors.blackFamily.black,
    fontSize: 14,
  },
});
