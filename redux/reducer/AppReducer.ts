import { createSlice } from "@reduxjs/toolkit";
import { AppStrings } from "@/constants/AppStrings";

const initialState: any = {
  isLoaderStart: false,
  isNetConnected: true,
  alertObj: null,
  userDataReducer: null,
};

export const AppSlice = createSlice({
  name: "AppReducer",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoaderStart = action.payload;
    },
    setNetConnected: (state, action) => {
      state.isNetConnected = action.payload;
    },
    setAlertObj: (state, action) => {
      const hidePopup = action.payload?.message == AppStrings.Error.loggedOut;
      if (!hidePopup) {
        state.alertObj = action.payload;
      }
    },
    setReducerUserData: (state, action) => {
      state.userDataReducer = action.payload;
    },
  },
});

export const { setLoader, setNetConnected, setAlertObj, setReducerUserData } =
  AppSlice.actions;
  
export default AppSlice.reducer;
