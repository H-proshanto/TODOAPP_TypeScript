import {createSlice} from '@reduxjs/toolkit';

export const errorSlice = createSlice({
  name: 'error',
  initialState: {
    value: '',
  },
  reducers: {
    setErrorMessage: (state, params) => {
      const {payload} = params;
      return {...state, value: payload};
    },
  },
});

export const {setErrorMessage} = errorSlice.actions;

export default errorSlice.reducer;
