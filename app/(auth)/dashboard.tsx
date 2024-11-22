import Header from "@/components/Header";
import { HelloWave } from "@/components/HelloWave";
import TextComponent from "@/components/TextComponent";
import { hv, normalized, ScreenProps } from "@/constants/AppConstants";
import { AppRootStore } from "@/redux/store/AppStore";
import { View, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "@/utils/Firebase";
import { signOut } from "firebase/auth";
import { setAlertObj, setLoader } from "@/redux/reducer/AppReducer";
import { resetPersistedReducer } from "@/redux/reducer/PersistedReducer";
import { AppStyles } from "@/constants/AppStyles";

const Page = (props: ScreenProps) => {
  const dispatch = useDispatch();
  const persistSelector = useSelector(
    (state: AppRootStore) => state.PersistedReducer
  );
  const user_email = persistSelector?.userPersistData
    ? persistSelector?.userPersistData?.email
    : "";

  const handleSignOut = async () => {
    try {
      dispatch(setLoader(true));
      await signOut(auth);
      dispatch(resetPersistedReducer());
      showAlert("Success", "You have been signed out.");
    } catch (error) {
      showAlert(
        "Error",
        "An error occurred while signing out. Please try again."
      );
    } finally {
      dispatch(setLoader(false));
    }
  };

  const showAlert = (title: string, message: string) => {
    setTimeout(() => {
      dispatch(
        setAlertObj({
          title: title,
          message: message,
        })
      );
    }, 300);
  };

  return (
    <SafeAreaView style={AppStyles.mainContainer}>
      <StatusBar barStyle="dark-content" />
      <Header title="Dashboard" onSignOut={handleSignOut} />
      <View style={styles.waveContainer}>
        <HelloWave />
        <View style={styles.welcomeText}>
          <TextComponent title={`Welcome ${user_email}`} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  waveContainer: {
    marginTop: hv(50),
    alignItems: "center",
  },
  welcomeText: {
    padding: normalized(5),
  },
});

export default Page;
