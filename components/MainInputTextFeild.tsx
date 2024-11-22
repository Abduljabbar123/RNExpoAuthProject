import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { forwardRef, useState } from "react";
import { View, Text } from "react-native";
import {
  AppFonts,
  AppImages,
  fullWidth,
  hv,
  normalized,
} from "@/constants/AppConstants";
import { AppStyles } from "@/constants/AppStyles";
import { Colors } from "@/constants/Colors";

interface Props {
  value?: any;
  onChangeText: any;
  placeholder: any;
  keyboardType?: any;
  secureTextEntry?: boolean;
  c_mainContainer?: any;
  title?: any;
  multiline?: any;
  eyeIcon?: any;
  c_titleStyle?: any;
  c_inputFeild?: any;
  c_placeHolderTextColor?: any;
  error?: any;
  editable?: boolean;
  onSubmitEditing?: any;
  returnKeyType?: any;
  onFocus?: any;
  onBlur?: any;
  isError?: boolean;
  showErrorIcon?: boolean;
  scrollEnabled?: any;
  maxLenght?: any;
  autoCapitalize?: any;
}

export const MainInputTextFeild = forwardRef((props: Props, ref: any) => {
  const [secureText, setSecureText] = useState(
    props.secureTextEntry ? props.secureTextEntry : false
  );
  const [isFocused, setIsFocused] = useState(false);

  const toggleFocus = () => {
    setIsFocused(!isFocused);
  };

  return (
    <View style={[props.c_mainContainer, styles.mainContainer]}>
      <View>
        {props?.title && (
          <Text style={{ ...styles.titleStyle, ...props?.c_titleStyle }}>
            {props?.title}
          </Text>
        )}
        <TextInput
          ref={ref}
          style={{
            ...styles.inputFeild,
            borderColor: props.isError
              ? Colors.redFamily.red
              : isFocused
              ? Colors.blueFamily.borderBlue
              : props.editable
              ? Colors.greyFamily.borderGrey
              : Colors.greyFamily.borderGrey,
            backgroundColor:
              props.value && !props.isError
                ? Colors.blueFamily.ExtraLightBlue
                : props.isError
                ? Colors.redFamily.lightRed
                : Colors.greyFamily.bgcGrey,
            color: props.isError
              ? Colors.redFamily.red
              : props.editable
              ? Colors.blackFamily.black
              : Colors.blackFamily.black,
            ...props?.c_inputFeild,
          }}
          onChangeText={props.onChangeText}
          value={props?.value}
          placeholder={props?.placeholder}
          scrollEnabled={props.scrollEnabled}
          keyboardType={props?.keyboardType}
          placeholderTextColor={Colors.greyFamily.gullGray}
          secureTextEntry={secureText}
          multiline={props.multiline}
          editable={props.editable}
          onSubmitEditing={props.onSubmitEditing}
          returnKeyType={props.returnKeyType}
          maxLength={props?.maxLenght ? props?.maxLenght : null}
          onFocus={() => {
            if (props.onFocus) {
              props.onFocus();
            }
            toggleFocus();
          }}
          onBlur={() => {
            if (props.onBlur) props.onBlur();
            toggleFocus();
          }}
          autoCapitalize={props.autoCapitalize ? props.autoCapitalize : "none"}
        />

        {props.showErrorIcon && props.isError ? (
          <View style={styles.eye}>
            <Image
              source={AppImages.error}
              style={[
                styles.passImg,
                {
                  tintColor: props.isError
                    ? Colors.redFamily.red
                    : props.editable
                    ? Colors.greyFamily.disableTxtGrey
                    : undefined,
                },
              ]}
            />
          </View>
        ) : (
          props.eyeIcon && (
            <TouchableOpacity
              activeOpacity={0.9}
              hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
              onPress={() => setSecureText(!secureText)}
              style={styles.eye}
            >
              <Image
                style={[
                  styles.passImg,
                  {
                    tintColor: props.isError
                      ? Colors.redFamily.red
                      : props.editable
                      ? Colors.greyFamily.disableTxtGrey
                      : undefined,
                  },
                ]}
                resizeMode="contain"
                source={secureText ? AppImages.eyeSlash : AppImages.showPass}
              />
            </TouchableOpacity>
          )
        )}
      </View>
      {props?.error ? (
        <Text style={styles.errorStyle}>{props?.error}</Text>
      ) : null}
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    
  },
  inputFeild: {
    height: 35,
    backgroundColor: Colors.catskillWhiteFamily.catskillWhiteLight,
    borderWidth: 1,
    borderColor: Colors.catskillWhiteFamily.catskillWhite,
    textAlignVertical: "center",
    borderRadius: 8,
    alignContent: "center",
    color: Colors.blackFamily.black,
    fontFamily: AppFonts.RubikRegular,
    paddingLeft: normalized(12),
    paddingVertical: hv(0),
  },
  passImg: {
    width: 18,
    height: 18,
  },
  titleStyle: {
    color: Colors.greyFamily.floridGray,
    fontFamily: AppFonts.RubikRegular,
    ...AppStyles.mainInputTitle,
    textAlignVertical: "center",
    marginBottom: Platform.OS == "ios" ? 3 : 0,
  },
  eye: {
    position: "absolute",
    bottom: 8,
    right: 10,
  },
  errorStyle: {
    fontFamily: AppFonts.RubikRegular,
    color: Colors.redFamily.red,
    fontSize: 11,
    marginTop: hv(3),
    marginLeft: normalized(2),
  },
});
