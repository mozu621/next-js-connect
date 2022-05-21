import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { AppState } from '../index';
import { PROPS_AUTHEN, PROPS_PROFILE, PROPS_NICKNAME } from '../types';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

export const fetchAsyncLogin = createAsyncThunk(
  'auth/post', //actionの名前
  async (authen: PROPS_AUTHEN) => {
    const res = await axios.post(`${apiUrl}authen/jwt/create`, authen, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  },
);

//新規登録
export const fetchAsyncRegister = createAsyncThunk(
  'api/authen/register',
  async (auth: PROPS_AUTHEN) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/authen/register/`,
      auth,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  },
);
//profile作成
export const fetchAsyncCreateProf = createAsyncThunk(
  'profile/post',
  async (nickName: PROPS_NICKNAME) => {
    const res = await axios.post(`${apiUrl}api/profile/`, nickName, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);
//profile更新
export const fetchAsyncUpdateProf = createAsyncThunk(
  'profile/put',
  async (profile: PROPS_PROFILE) => {
    const uploadData = new FormData();
    uploadData.append('nickName', profile.nickName);
    profile.img && uploadData.append('img', profile.img, profile.img.name);
    const res = await axios.put(`${apiUrl}api/profile/${profile.id}/`, uploadData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncGetMyProf = createAsyncThunk('profile/get', async () => {
  const res = await axios.get(`${apiUrl}api/myprofile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data[0]; //djangoでフィルターをかけているおり、戻り値が配列のため、①番目のデータを取り出している。
});

export const fetchAsyncGetProfs = createAsyncThunk('profiles/get', async () => {
  const res = await axios.get(`${apiUrl}api/profile/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    openSignIn: true, //モーダルの表示のstate
    openSignUp: false, //モーダルの表示のstate
    openProfile: false, //モーダルの表示のstate
    isLoadingAuth: false, //apiにアクセスしている最中にtrueになる
    myprofile: {
      id: 0,
      nickName: '',
      introduction: '',
      profileUser: 0,
      created_on: '',
      img: '',
    },
    profiles: [
      {
        id: 0,
        nickName: '',
        Introduction: '',
        profileUser: 0,
        created_on: '',
        img: '',
      },
    ],
  },
  reducers: {
    //普通にstateを更新する？
    fetchCredStart(state) {
      state.isLoadingAuth = true;
    },
    fetchCredEnd(state) {
      state.isLoadingAuth = false;
    },
    setOpenSignIn(state) {
      state.openSignIn = true;
    },
    resetOpenSignIn(state) {
      state.openSignIn = false;
    },
    setOpenSignUp(state) {
      state.openSignUp = true;
    },
    resetOpenSignUp(state) {
      state.openSignUp = false;
    },
    setOpenProfile(state) {
      state.openProfile = true;
    },
    resetOpenProfile(state) {
      state.openProfile = false;
    },
    editNickname(state, action) {
      state.myprofile.nickName = action.payload;
    },
  },
  extraReducers: (builder) => {
    //外部通信？何かの処理が終わった後にstateを更新する？
    builder.addCase(fetchAsyncLogin.fulfilled, (state, action) => {
      //fulfilled→成功した場合
      localStorage.setItem('localJWT', action.payload.access); //action.payloadはfetchAsyncLoginの戻り値
    });
    builder.addCase(fetchAsyncCreateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetMyProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
    });
    builder.addCase(fetchAsyncGetProfs.fulfilled, (state, action) => {
      state.profiles = action.payload;
    });
    builder.addCase(fetchAsyncUpdateProf.fulfilled, (state, action) => {
      state.myprofile = action.payload;
      state.profiles = state.profiles.map(
        (prof) => (prof.id === action.payload.id ? action.payload : prof), //更新したデータだけを即座に更新する
      );
    });
  },
});

export const {
  //関数を外部で使えるようにしている
  fetchCredStart,
  fetchCredEnd,
  setOpenSignIn,
  resetOpenSignIn,
  setOpenSignUp,
  resetOpenSignUp,
  setOpenProfile,
  resetOpenProfile,
  editNickname,
} = authSlice.actions;

export const selectIsLoadingAuth = (
  state: AppState, //stateをuseselecterで使うための処理　新たに関数を定義している　stateとrootstateを結びつけている？
) => state.auth.isLoadingAuth; //storeの内容と一致させる。
export const selectOpenSignIn = (state: AppState) => state.auth.openSignIn;
export const selectOpenSignUp = (state: AppState) => state.auth.openSignUp;
export const selectOpenProfile = (state: AppState) => state.auth.openProfile;
export const selectProfile = (state: AppState) => state.auth.myprofile;
export const selectProfiles = (state: AppState) => state.auth.profiles;

export default authSlice.reducer;
