import {createSlice} from '@reduxjs/toolkit';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {BASE_URL} from '../config';
import axios from 'axios';

const initialState: {
  status: string;
  user: object;
  error: string | undefined;
} = {
  status: 'idle',
  user: {
    id: null,
    username: '',
    email: '',
  },
  error: '',
};

export const login: any = createAsyncThunk(
  'user/login',
  async (userName: string) => {
    const apiSubDirectory = 'login';
    const url = `${BASE_URL}/${apiSubDirectory}/`;
    const response: any = await axios({
      method: 'POST',
      url,
      data: {
        username: userName,
      },
    });

    return response.data;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    resetStatus: state => {
      return {...state, status: 'idle'};
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'running';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = '';
        state.status = 'resolved';
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error?.message;
        state.status = 'error';
      });
  },
});

export const {logout, resetStatus} = userSlice.actions;
export default userSlice.reducer;
