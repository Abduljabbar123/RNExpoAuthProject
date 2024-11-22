import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useDispatch, useSelector} from 'react-redux';
import { AppRootStore } from '@/redux/store/AppStore';
import { AppFonts, hv, normalized } from '@/constants/AppConstants';
import CommonDataManager from '@/utils/CommonManger';
import { setAlertObj } from '@/redux/reducer/AppReducer';
import { Colors } from '@/constants/Colors';

const {width, height} = Dimensions.get('window');
const AppAlertModal = () => {
  const dispatch = useDispatch();
  const {alertObj}: any = useSelector(
    (state: AppRootStore) => state.AppReducer,
  );
  const viewOffset = useSharedValue(height);
  useEffect(() => {
    viewOffset.value = withTiming(0, {
      duration: 500,
    });
  }, []);
  const boxMoveStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: viewOffset.value,
        },
      ],
    };
  });
  const closeModal = () => {
    viewOffset.value = withTiming(height, {
      duration: 500,
    });
    setTimeout(() => {
      dispatch(setAlertObj(false));
    }, 500);
  };
  return (
    <View style={styles.main}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.transparentFamily.transparentColor}
      />
      <Animated.View
        style={[
          styles.popup,
          {
            width:
              width *
              (CommonDataManager.getSharedInstance().isFoldableDevice
                ? 0.5
                : 0.7),
          },
          boxMoveStyle,
        ]}>
        <Text style={styles.title}>{alertObj?.title}</Text>
        <Text numberOfLines={4} style={styles.message}>
          {alertObj?.message}
        </Text>
        <TouchableWithoutFeedback hitSlop={{right: 10, left: 10, top: 10, bottom: 10}} onPress={() => closeModal()}>
          <View style={styles.btnBox}>
            <Text style={styles.btnTitle}>OK</Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </View>
  );
};

export default AppAlertModal;

const styles = StyleSheet.create({
  main: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.transparentFamily.transparentColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: Colors.whiteFamily.white,
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: normalized(10),
  },
  title: {
    fontFamily: AppFonts.RubikMedium,
    color: Colors.blackFamily.black,
    fontSize: 17,
    marginTop: hv(20),
  },
  message: {
    fontFamily: AppFonts.RubikRegular,
    color: Colors.blackFamily.black,
    fontSize: 14,
    textAlign: 'center',
    marginTop: normalized(10)
  },
  btnBox: {
    height: hv(45),
    width: normalized(100),
    borderRadius: 35,
    backgroundColor: Colors.blueFamily.primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hv(20),
    marginBottom: hv(20),
  },
  btnTitle: {
    fontSize: 16,
    fontFamily: AppFonts.RubikMedium,
    color: Colors.whiteFamily.white,
  },
});
