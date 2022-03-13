import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppState } from '../index';
import { LIKE } from '../types';

const apiUrl = process.env.REACT_APP_DEV_API_URL;

const initialState: LIKE = {
  count: 5,
};

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    //普通にstateを更新する？
    addcount(state) {
      state.count += 1;
    },
  },
});

export const {
  //関数を外部で使えるようにしている
  addcount,
} = portfolioSlice.actions;

export const selectCount = (state: AppState) => state.portfolio.count;

export default portfolioSlice.reducer;
