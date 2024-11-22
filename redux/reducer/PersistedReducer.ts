import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  userPersistData: null,
  userToken: null,
};

export const PersistedSlice = createSlice({
  name: "PersistedReducer",
  initialState,
  reducers: {
    resetPersistedReducer: (state) => {
      Object.assign(state, initialState);
    },
    setUserPersistData: (state, action) => {
      state.userPersistData = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { resetPersistedReducer, setUserPersistData, setUserToken } =
  PersistedSlice.actions;
export default PersistedSlice.reducer;
