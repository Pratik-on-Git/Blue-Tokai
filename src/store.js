import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  showSuccess: false,
  mode: 'login', // or 'signup'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.showSuccess = true;
    },
    signup: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.showSuccess = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    showSuccess: (state) => {
      state.showSuccess = true;
    },
    hideSuccess: (state) => {
      state.showSuccess = false;
    },
    setMode: (state, action) => {
      state.mode = action.payload;
    }
  }
});

export const { login, signup, logout, showSuccess, hideSuccess, setMode } = authSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export default store; 