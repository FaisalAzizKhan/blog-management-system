// src/app/Store/ReduxToolkit/Store.ts

import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: AuthState = {
  user: null,
  token: null,
  expiresIn: null,
}


const AuthSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {

    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string; expiresIn: number }>
    ) => {
      
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expiresIn = action.payload.expiresIn;

    },
    clearCredentials: (state) => {
      state.user = null
      state.token = null
      state.expiresIn = null
    },
  },
});

export const { setCredentials, clearCredentials } = AuthSlice.actions
export default AuthSlice.reducer

// Get Data / Usage =>   const currentuser = useAppSelector((state) => state.auth.user)
// Put Data / Usage =>   useAppDispatch(setCredentials({}))