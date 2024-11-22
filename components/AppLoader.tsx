import React from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { Colors } from '@/constants/Colors';
const AppLoader = () => {
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.transparentFamily.transparentColor}
      />
      <SafeAreaView />
      <View style={styles.loaderBox}>
        <ActivityIndicator
          color={Colors.blueFamily.primaryBlue}
          size="large"
        />
      </View>
    </View>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.transparentFamily.transparentColor,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  loaderBox: {
    backgroundColor: Colors.whiteFamily.white,
    borderRadius: 20,
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
