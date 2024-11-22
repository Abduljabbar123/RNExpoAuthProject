import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { View, ActivityIndicator } from "react-native";
import { auth } from "@/utils/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Provider } from "react-redux";
import { store } from "@/redux/store/AppStore";
import AppContainer from "@/container/AppContainer";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChangedFn = (user: any) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedFn);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/(auth)/dashboard");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  if (initializing)
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <Provider store={store}>
      <AppContainer>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="signup" options={{ title: "SignUp" }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </AppContainer>
    </Provider>
  );
}
