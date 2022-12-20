import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const HomeSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    language: (state, action) => {
      const {payload} = action;
      state.language = payload;
    },
  },
});
export default HomeSlice.reducer;
