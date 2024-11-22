import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {
  AppFonts,
  normalized,
} from '@/constants/AppConstants';
import { Colors } from '@/constants/Colors';

interface Props {
  onPressBtn: any;
  title: string;
  disabled?: boolean;
  arrow?: boolean;
  c_maincontainer?: any;
  c_titleStyle?: any;
  arrow_style?: any;
}

const MainButton = (props: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.button,
        props?.c_maincontainer,
        props.disabled && {
          backgroundColor: Colors.greyFamily.disableBtnGrey,
        },
      ]}
      onPress={props?.onPressBtn}
      disabled={props.disabled}>
      <Text
        style={[
          styles.buttonText,
          props?.c_titleStyle,
          props.disabled && {color: Colors.greyFamily.disableTxtGrey},
        ]}>
        {props?.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.blueFamily.primaryBlue,
    width: normalized(160),
    height: 41,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    color: Colors.whiteFamily.white,
    fontFamily: AppFonts.RubikMedium,
  },
  arrow: {
    tintColor: Colors.whiteFamily.white,
    marginLeft: normalized(10),
  },
});

export default MainButton;
