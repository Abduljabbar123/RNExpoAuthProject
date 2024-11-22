import { StatusBar, View } from "react-native";
import AppLoader from "@/components/AppLoader";
import { useDispatch, useSelector } from "react-redux";
import AppAlertModal from "@/components/AppAlertModal";
import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { AppStyles } from "@/constants/AppStyles";
import NoInternetComponent from "@/components/NoInternetComponent";
import { setNetConnected } from "@/redux/reducer/AppReducer";
type Props = {
  children: React.ReactNode;
};
export default function AppContainer(props: Props) {
  const { isLoaderStart, alertObj } = useSelector(
    (AppState: any) => AppState.AppReducer
  );

  const [isConnected, setIsConnected] = useState<boolean>(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      setIsConnected(state.isConnected);
      dispatch(setNetConnected(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={AppStyles.mainContainer}>
      {!isConnected ? (
        <NoInternetComponent />
      ) : (
        <View style={AppStyles.mainContainer}>
          <StatusBar barStyle={"dark-content"} />
          {props.children}
          {isLoaderStart && <AppLoader />}
          {alertObj && <AppAlertModal />}
        </View>
      )}
    </View>
  );
}
