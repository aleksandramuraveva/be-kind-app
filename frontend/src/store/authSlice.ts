import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  username?: string; 
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = undefined; 
    },
    updateUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { login, logout, updateUsername } = authSlice.actions;
export default authSlice.reducer;
