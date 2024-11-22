import MainButton from "@/components/MainButton";
import { MainInputTextFeild } from "@/components/MainInputTextFeild";
import TextComponent from "@/components/TextComponent";
import {
  AppFonts,
  fullWidth,
  hv,
  normalized,
  ScreenProps,
} from "@/constants/AppConstants";
import { AppStrings } from "@/constants/AppStrings";
import CommonDataManager from "@/utils/CommonManger";
import { useRef, useState } from "react";
import { View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setAlertObj, setLoader } from "@/redux/reducer/AppReducer";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/Firebase";
import {
  setUserPersistData,
  setUserToken,
} from "@/redux/reducer/PersistedReducer";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/AppStyles";
import { useRouter } from "expo-router";

const SignupScreen = (props: ScreenProps) => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();

  const { isNetConnected } = useSelector(
    (AppState: any) => AppState.AppReducer
  );

  const resetFeilds = () => {
    setEmail("");
    setPassword("");
  };

  const validation = () => {
    if (!email) {
      showAlert(AppStrings.Auth.validation, AppStrings.Auth.enterEmailDes);
      return;
    }
    if (!password) {
      showAlert(AppStrings.Auth.validation, AppStrings.Auth.enterPasswordTitle);
      return;
    }
    if (!confirmPassword) {
      showAlert(
        AppStrings.Auth.validation,
        AppStrings.Auth.enterConfirmPassword
      );
      return;
    }
    if (
      !CommonDataManager.getSharedInstance().isConPasswordValid(
        password,
        confirmPassword
      )
    ) {
      showAlert(AppStrings.Auth.validation, AppStrings.Auth.enterSamePassword);
      return;
    }
    if (!isNetConnected) {
      return;
    }
    signUpWithCredentials();
  };

  const signUpWithCredentials = async () => {
    try {
      dispatch(setLoader(true));
      const userCredentials: any = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      postValues(userCredentials);
    } catch (error: any) {
      showError(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const showAlert = (title: string, message: string) => {
    dispatch(
      setAlertObj({
        title: title,
        message: message,
      })
    );
  };

  const postValues = async (
    userCredentials: FirebaseAuthTypes.UserCredential
  ) => {
    const user = userCredentials.user;
    const token = await user.getIdToken();
    const serializedUser =
      CommonDataManager.getSharedInstance().serializeUser(user);
    dispatch(setUserPersistData(serializedUser));
    dispatch(setUserToken(token));
    resetFeilds();
    showAlert(AppStrings.SucessMsg.signUp, AppStrings.SucessMsg.signUpDes);
  };

  const showError = (error: FirebaseError) => {
    if (error.code === AppStrings.AuthError.errorCode.alreadyInUse) {
      showAlert(
        AppStrings.AuthError.error,
        AppStrings.AuthError.emailAlreadyUse
      );
    } else if (error.code === AppStrings.AuthError.errorCode.invalidEmail) {
      showAlert(AppStrings.AuthError.error, AppStrings.AuthError.invalidEmail);
    } else {
      showAlert(
        AppStrings.AuthError.error,
        AppStrings.AuthError.unexpectedError
      );
    }
  };

  return (
    <View style={AppStyles.mainContainer}>
      <SafeAreaView />
      <View style={styles.cardContainer}>
        <TextComponent title={AppStrings.Auth.signupTitle} />

        <View style={styles.inputContainer}>
          <MainInputTextFeild
            ref={emailRef}
            onChangeText={(val: string) => {
              setEmail(val), setEmailError("");
              setError({
                ...error,
                email:
                  CommonDataManager.getSharedInstance().isEmailValid(val) ||
                  val == ""
                    ? false
                    : true,
              });
            }}
            placeholder={AppStrings.Auth.enterEmailDes}
            keyboardType={"email-address"}
            title={AppStrings.Auth.enterEmailTitle}
            value={email}
            c_mainContainer={styles.inputView}
            error={emailError}
            onSubmitEditing={() =>
              CommonDataManager.getSharedInstance().focusNextField(passwordRef)
            }
            returnKeyType={"next"}
            isError={error.email}
            showErrorIcon
          />

          <MainInputTextFeild
            ref={passwordRef}
            onChangeText={(val: string) => {
              setPassword(val), setPasswordError("");
              setError({
                ...error,
                password:
                  CommonDataManager.getSharedInstance().isPasswordValid(val) ||
                  val == ""
                    ? false
                    : true,
              });
            }}
            placeholder={AppStrings.Auth.enterPasswordTitle}
            title={AppStrings.Auth.password}
            value={password}
            eyeIcon={true}
            secureTextEntry={true}
            c_mainContainer={styles.inputView}
            error={passwordError}
            isError={error.password}
          />

          <MainInputTextFeild
            ref={passwordRef}
            onChangeText={(val: string) => {
              setConfirmPassword(val), setConfirmPasswordError("");
              setError({
                ...error,
                confirmPassword:
                  CommonDataManager.getSharedInstance().isPasswordValid(val) ||
                  val == ""
                    ? false
                    : true,
              });
            }}
            placeholder={AppStrings.Auth.confirmPasswordDes}
            title={AppStrings.Auth.confirmPasswordTitle}
            value={confirmPassword}
            eyeIcon={true}
            secureTextEntry={true}
            c_mainContainer={styles.inputView}
            error={confirmPasswordError}
            isError={error.confirmPassword}
          />

          <View style={styles.accountView}>
            <TextComponent simpleText={AppStrings.Auth.doYouHaveAcc} />
            <TouchableOpacity
              onPress={() => {
                router.navigate("/");
                resetFeilds();
              }}
              hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
              activeOpacity={1}
            >
              <TextComponent
                boldText={AppStrings.Auth.loginTitle}
                txtStyle={{ marginLeft: normalized(5) }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mainBtnView}>
            <MainButton
              onPressBtn={() => {
                validation();
              }}
              title={AppStrings.Auth.signupTitle}
              disabled={
                error.email || error.password || !email || !password
                  ? true
                  : false
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    alignSelf: "center",
    margin: 5,
  },
  loginStyle: {
    fontFamily: AppFonts.RubikBold,
    fontSize: 14,
    color: Colors.blackFamily.black,
  },
  inputContainer: {
    paddingTop: normalized(50),
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: normalized(20),
  },
  mainBtnView: {
    alignSelf: "center",
    marginTop: normalized(50),
  },
  accountView: {
    flexDirection: "row",
    width: fullWidth,
    justifyContent: "center",
    marginTop: hv(10),
  },
});

export default SignupScreen;
