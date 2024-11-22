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
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/utils/Firebase";
import { setAlertObj, setLoader } from "@/redux/reducer/AppReducer";
import {
  setUserPersistData,
  setUserToken,
} from "@/redux/reducer/PersistedReducer";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseError } from "firebase/app";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { Colors } from "@/constants/Colors";
import { AppStyles } from "@/constants/AppStyles";
import { useRouter } from "expo-router";

const Index = (props: ScreenProps) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState({
    email: false,
    password: false,
  });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const { isNetConnected } = useSelector(
    (AppState: any) => AppState.AppReducer
  );

  const validation = () => {
    if (!email) {
      showAlert(AppStrings.Auth.validation, AppStrings.Auth.enterEmailDes);
      return;
    }
    if (!password) {
      showAlert(AppStrings.Auth.validation, AppStrings.Auth.enterPasswordTitle);
      return;
    }
    if (!isNetConnected) {
      return;
    }
    signInWithCredentials();
  };

  const signInWithCredentials = async () => {
    try {
      dispatch(setLoader(true));
      const userCredentials: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      resetFeilds();
      setPostValues(userCredentials);
    } catch (error: any) {
      showError(error);
    } finally {
      dispatch(setLoader(false));
    }
  };

  const setPostValues = async (
    userCredentials: FirebaseAuthTypes.UserCredential
  ) => {
    const user = userCredentials.user;
    const token = await user.getIdToken();
    const serializedUser =
      CommonDataManager.getSharedInstance().serializeUser(user);
    dispatch(setUserPersistData(serializedUser));
    dispatch(setUserToken(token));
    showAlert(AppStrings.SucessMsg.login, AppStrings.SucessMsg.loginDes);
  };

  const showAlert = (title: string, message: string) => {
    setTimeout(() => {
      dispatch(
        setAlertObj({
          title: title,
          message: message,
        })
      );
    }, 100);
  };

  const showError = (error: FirebaseError) => {
    if (error.code === AppStrings.AuthError.errorCode.userNotFound) {
      showAlert(AppStrings.AuthError.error, AppStrings.AuthError.noUserFound);
    } else if (error.code === AppStrings.AuthError.errorCode.wrongPass) {
      showAlert(
        AppStrings.AuthError.error,
        AppStrings.AuthError.passwordIncorrect
      );
    } else if (error.code === AppStrings.AuthError.errorCode.invalidEmail) {
      showAlert(AppStrings.AuthError.error, AppStrings.AuthError.invalidEmail);
    } else if (error.code === AppStrings.AuthError.errorCode.invalidCred) {
      showAlert(
        AppStrings.AuthError.error,
        AppStrings.AuthError.credentialsInvalid
      );
    } else {
      showAlert(
        AppStrings.AuthError.error,
        AppStrings.AuthError.unexpectedError
      );
    }
  };

  const resetFeilds = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <View style={AppStyles.mainContainer}>
      <KeyboardAvoidingView behavior="padding" style={AppStyles.mainContainer}>
        <SafeAreaView />
        <View style={styles.cardContainer}>
          <TextComponent title={AppStrings.Auth.loginTitle} />

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
                CommonDataManager.getSharedInstance().focusNextField(
                  passwordRef
                )
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
                    CommonDataManager.getSharedInstance().isPasswordValid(
                      val
                    ) || val == ""
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

            <View style={styles.accountView}>
              <TextComponent simpleText={AppStrings.Auth.doYouHaveAcc} />
              <TouchableOpacity
                onPress={() => {
                  //   props.navigation.push(Routes.Auth.SignUp);
                  router.navigate("/signup");
                  resetFeilds();
                }}
                hitSlop={{ left: 5, top: 5, right: 5, bottom: 5 }}
                activeOpacity={1}
              >
                <TextComponent
                  boldText={AppStrings.Auth.signupTitle}
                  txtStyle={{ marginLeft: normalized(5) }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.mainBtnView}>
              <MainButton
                onPressBtn={() => {
                  validation();
                }}
                title={"Sign In"}
                disabled={
                  error.email || error.password || !email || !password
                    ? true
                    : false
                }
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
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

export default Index;
