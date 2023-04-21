import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showInfo: false,
    message: '',
    showLogin: false,
    showRegister: false,
  },
  reducers: {
    showInfo: (state, action) => {
      state.showInfo = true;
      state.message = action.payload;
    },
    hideInfo: (state) => {
      state.showInfo = false;
      state.message = '';
    },
    showLogin: (state) => {
      state.showRegister = false;
      state.showLogin = true;
    },
    hideLogin: (state) => {
      state.showLogin = false;
    },
    showRegister: (state) => {
      state.showLogin = false;
      state.showRegister = true;
    },
    hideRegister: (state) => {
      state.showRegister = false;
    }
  },
});
export const { showInfo, hideInfo, showLogin, hideLogin, showRegister,hideRegister } = uiSlice.actions;

export default uiSlice.reducer;
