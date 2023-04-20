import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    showInfo: false,
    message: '',
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
  },
});
export const { showInfo, hideInfo } = uiSlice.actions;

export default uiSlice.reducer;
