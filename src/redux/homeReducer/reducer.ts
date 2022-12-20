import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
};

const HomeSlice = createSlice({
  name: 'Home',
  initialState,
  reducers: {
    language: (state, action) => {
      console.log('inreducer');
      const {payload} = action;
      state.language = payload;
    },
  },
});
export default HomeSlice.reducer;
