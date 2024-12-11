import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa localStorage para persistir o estado
import userReducer from './authSlice';
import logger from 'redux-logger';

// Configuração do Redux Persist
const persistConfig = {
  key: 'root', // Nome da chave de persistência
  storage, // Define o storage (localStorage neste caso)
};

// Combina os reducers
const rootReducer = combineReducers({
  auth: userReducer,
});

// Aplica o persistReducer ao rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configura a store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desabilita verificações para evitar conflitos com Redux Persist
    }).concat(logger),
});

// Configura o persistor
export const persistor = persistStore(store);

// Tipos para uso no app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
