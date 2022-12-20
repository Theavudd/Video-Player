import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  countryCode: '',
  phoneNo: '',
  uid: '',
  name: '',
  avatar: '',
  inbox: [],
  contactList: [],
  blockList: [],
  online: false,
};

const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const {payload} = action;
      state.countryCode = payload.countryCode;
      state.phoneNo = payload.phoneNo;
    },
  },
});
export default AuthSlice.reducer;
