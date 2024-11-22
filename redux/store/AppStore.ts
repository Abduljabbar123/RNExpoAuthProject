import {configureStore} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppReducer from '../reducer/AppReducer';
import PersistedReducer from '../reducer/PersistedReducer';

const reduxPersistActions = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const pReducer = persistReducer(persistConfig, PersistedReducer);

export const store = configureStore({
  reducer: {
    AppReducer,
    PersistedReducer: pReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [...reduxPersistActions],
      },
    }),
});

export const persistor = persistStore(store);

export type AppRootStore = ReturnType<typeof store.getState>;
export default {store, persistor};
