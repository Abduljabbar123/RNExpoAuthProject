import { Dimensions, Platform, PixelRatio } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export const platformVersion = Platform.Version;
export const isAndroid = Platform.OS == "android";
export type ScreenProps = NativeStackScreenProps<any, any>;

export const ScreenSize = Dimensions.get("window");

const templateWidth = 375;
const templateHeight = 812;
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;

export const isSmallDevice = ScreenSize.height < 700 ? true : false;

export const isLargeHeight = Dimensions.get("window").height > 750;

export const isLargeWidth = Dimensions.get("window").width > 390;
export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);

export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
let value = normalized(20) * 2;
export const formFieldsHeight =
  Platform.OS == "android" ? normalized(45) : normalized(45);

export const horizontalScreenWithMargin = ScreenSize.width - value;

export const { width: fullWidth, height: fullHeight } =
  Dimensions.get("window");

export const getWidthPercentage = (percentage: any) =>
  (fullWidth * percentage) / 100;

export const getHeightPercentage = (percentage: any) =>
  (fullHeight * percentage) / 100;

export const getHeightPixel = (pixel: any) => {
  const percent = (pixel / 812) * 100;
  return getHeightPercentage(percent);
};

export const getWidthPixel = (pixel: any) => {
  const percent = (pixel / 375) * 100;
  return getWidthPercentage(percent);
};

export const AppHorizontalMargin = normalized(18);

export const getResponsiveFont = (fontSize: any) => {
  const deviceWidth = Dimensions.get("window").width;
  const scaleFactor =
    deviceWidth < 400
      ? 1
      : deviceWidth < 500
      ? 1.2
      : deviceWidth < 600
      ? 1.3
      : 1.5;
  return Math.round(scaleFactor * fontSize);
};

export const AppFonts = {
  RubikBold: "Rubik-Bold",
  RubikLight: "Rubik-Light",
  RubikMedium: "Rubik-Medium",
  RubikRegular: "Rubik-Regular",
  SpaceMonoRegular: "SpaceMono-Regular"
};

export const AppImages = {
  eyeSlash: require("@/assets/images/eye-slash.png"),
  showPass: require("@/assets/images/ShowPassword.png"),
  error: require("@/assets/images/error.png"),
};
