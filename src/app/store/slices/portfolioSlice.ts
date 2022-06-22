import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Like } from '../../../components/Like';
import { AppState } from '../index';
import { PROPS_LIKE, PROPS_NEWPORTFOLIO, COMMENT, TAG, PORTFOLIO } from '../types';

const apiUrlPortfolio = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/portfolio/`;
const apiUrlComment = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/comment/`;
const apiUrlTag = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/tag/`;
const apiUrlPostTag = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/tagpost/`;
const apiUrlLike = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/like/`;
//追加　タグ機能
const apiUrlFilterTag = `${process.env.NEXT_PUBLIC_API_ENDOPOINT}api/tagfilter/`;
//　ここまで

export const fetchAsyncGetPortfolios = createAsyncThunk('portfolio/get', async () => {
  const res = await axios.get(apiUrlPortfolio, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

//ポートフォリオ作成
export const fetchAsyncNewPortfolio = createAsyncThunk(
  'portfolio/post',
  async (newPortfolio: PROPS_NEWPORTFOLIO) => {
    const uploadData = new FormData();
    uploadData.append('title', newPortfolio.title);
    //newPortfolio.img && uploadData.append('img', newPortfolio.img, newPortfolio.img.name);
    const res = await axios.post(apiUrlPortfolio, uploadData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

//いいね作成
export const fetchAsyncNewLike = createAsyncThunk(
  'like/post',
  async (likePortfolio: PROPS_LIKE) => {
    const res = await axios.post(apiUrlLike, likePortfolio, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

//いいね取得
export const fetchAsyncGetLikes = createAsyncThunk('like/get', async () => {
  const res = await axios.get(apiUrlLike, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

//いいね削除
export const fetchAsyncDeleteLike = createAsyncThunk(
  'like/delete',
  async (delete_like_id: number) => {
    const res = await axios.delete(`${apiUrlLike}${delete_like_id}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

//export const fetchAsyncPatchLiked = createAsyncThunk(
//    "post/patch",
//    async (liked: PROPS_LIKED) => {
//        const currentLiked = liked.current;
//        const uploadData = new FormData();
//
//        let isOverlapped = false;
//        currentLiked.forEach((current) => {
//            if (current === liked.new) {
//                isOverlapped = true;
//            } else {
//                uploadData.append("liked", String(current));
//            }
//        });
//
//        if (!isOverlapped) {
//            uploadData.append("liked", String(liked.new));
//        } else if (currentLiked.length === 1) {
//            uploadData.append("title", liked.title);
//            const res = await axios.put(`${apiUrlPost}${liked.id}/`, uploadData, {
//                headers: {
//                    "Content-Type": "application/json",
//                    Authorization: `JWT ${localStorage.localJWT}`,
//                },
//            });
//            return res.data;
//        }
//        const res = await axios.patch(`${apiUrlPost}${liked.id}/`, uploadData, {
//            headers: {
//                "Content-Type": "application/json",
//                Authorization: `JWT ${localStorage.localJWT}`,
//            },
//        });
//        return res.data;
//    }
//);
//
export const fetchAsyncGetComments = createAsyncThunk('comment/get', async () => {
  const res = await axios.get(apiUrlComment, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncPostComment = createAsyncThunk('comment/post', async (comment: COMMENT) => {
  const res = await axios.post(apiUrlComment, comment, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncDeleteComment = createAsyncThunk(
  'comment/delete',
  async (commentid: number) => {
    const res = await axios.delete(`${apiUrlComment}${commentid}/`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncGetTags = createAsyncThunk('tag/get', async () => {
  const res = await axios.get(apiUrlTag, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncPostTag = createAsyncThunk('tagpost/post', async (tag: TAG) => {
  const res = await axios.post(apiUrlPostTag, tag, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncGetFilterTags = createAsyncThunk(
  'tagfilter/get',
  async (tagname: string) => {
    const res = await axios.get(`${apiUrlFilterTag}?tagname=${tagname}/`, {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

export const fetchAsyncUpdatePortfolio = createAsyncThunk(
  'portfolio/put',
  async (portfolio: PORTFOLIO) => {
    const uploadData = new FormData();
    uploadData.append('title', portfolio.title);
    uploadData.append('url', portfolio.url);
    uploadData.append('content', portfolio.content);
    portfolio.img && uploadData.append('img', portfolio.img);
    const res = await axios.put(`${apiUrlPortfolio}${portfolio.id}/`, uploadData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    });
    return res.data;
  },
);

export const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    isLoadingPost: false,
    openNewPost: false, //新規登録のモーダルを表示させるSTATE
    openNewComment: false,
    openLikeuser: false,
    portfolios: [
      {
        id: 0,
        title: '',
        url: '',
        content: '',
        author: 0,
        created_on: '',
        img: '',
      },
    ],
    likes: [
      {
        id: 0,
        likeUser: 0,
        likePortfolio: 0,
      },
    ],

    comments: [
      {
        id: 0,
        text: '',
        commentUser: 0,
        commentPortfolio: 0,
      },
    ],
    tags: [
      {
        id: 0,
        tagname: '',
        tagPortfolio: {
          id: 0,
          title: '',
          url: '',
          content: '',
          author: 0,
          created_on: '',
          img: '',
        },
      },
    ],
  },
  reducers: {
    fetchPostStart(state) {
      state.isLoadingPost = true;
    },
    fetchPostEnd(state) {
      state.isLoadingPost = false;
    },
    setOpenNewPost(state) {
      state.openNewPost = true;
    },
    resetOpenNewPost(state) {
      state.openNewPost = false;
    },
    setOpenNewComment(state) {
      state.openNewComment = true;
    },
    resetOpenNewComment(state) {
      state.openNewComment = false;
    },
    setOpenLikeuser(state) {
      state.openLikeuser = true;
    },
    resetOpenLikeuser(state) {
      state.openLikeuser = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetPortfolios.fulfilled, (state, action) => {
      return {
        ...state,
        portfolios: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewPortfolio.fulfilled, (state, action) => {
      return {
        ...state,
        portfolios: [...state.portfolios, action.payload],
      };
    });
    builder.addCase(fetchAsyncUpdatePortfolio.fulfilled, (state, action) => {
      state.portfolios = state.portfolios.map(
        (portfolio) => (portfolio.id === action.payload.id ? action.payload : portfolio), //更新したデータだけを即座に更新する
      );
    });
    builder.addCase(fetchAsyncGetLikes.fulfilled, (state, action) => {
      return {
        ...state,
        likes: action.payload,
      };
    });
    builder.addCase(fetchAsyncNewLike.fulfilled, (state, action) => {
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    });
    builder.addCase(fetchAsyncDeleteLike.fulfilled, (state, action) => {
      return {
        ...state,
        likes: [...state.likes, action.payload],
      };
    });
    builder.addCase(fetchAsyncGetComments.fulfilled, (state, action) => {
      return {
        ...state,
        comments: action.payload,
      };
    });
    builder.addCase(fetchAsyncPostComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });
    builder.addCase(fetchAsyncDeleteComment.fulfilled, (state, action) => {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    });

    builder.addCase(fetchAsyncGetTags.fulfilled, (state, action) => {
      return {
        ...state,
        tags: action.payload,
      };
    });

    builder.addCase(fetchAsyncPostTag.fulfilled, (state, action) => {
      return {
        ...state,
        tags: [...state.tags, action.payload],
      };
    });

    //    builder.addCase(fetchAsyncPatchLiked.fulfilled, (state, action) => {
    //        return {
    //            ...state,
    //            posts: state.posts.map((post) =>
    //                post.id === action.payload.id ? action.payload : post
    //            ),
    //      };
  },
});

export const {
  //関数を外部で使えるようにしている
  fetchPostStart,
  fetchPostEnd,
  setOpenNewComment,
  resetOpenNewComment,
  setOpenLikeuser,
  resetOpenLikeuser,
} = portfolioSlice.actions;

export const selectPortfolios = (state: AppState) => state.portfolio.portfolios;
export const selectLikes = (state: AppState) => state.portfolio.likes;
export const selectComments = (state: AppState) => state.portfolio.comments;
export const selectOpenNewCommnet = (state: AppState) => state.portfolio.openNewComment;
export const selectOpenLikeuser = (state: AppState) => state.portfolio.openLikeuser;
export const selectTags = (state: AppState) => state.portfolio.tags;

export default portfolioSlice.reducer;
