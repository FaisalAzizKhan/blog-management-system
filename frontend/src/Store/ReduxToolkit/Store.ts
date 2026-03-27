// src/app/Store/ReduxToolkit/Store.ts

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import authReducer from './AuthSlice'
// import cartReducer  from './CartSlice'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'


const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer,
})
 

const persistConfig = {
  key: "root",
  storage: storage,
}

// persist direct localstorage me save krega

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
 
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = store.dispatch;



// Usage =>   const user = useAppSelector((state) => state.auth.user)
