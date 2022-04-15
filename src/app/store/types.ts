//authslice
export interface PROPS_AUTHEN {
  email: string;
  password: string;
}

export interface PROPS_PROFILE {
  id: number;
  nickName: string;
  profileUser: number;
  img: File | null;
}

export interface PROPS_NICKNAME {
  nickName: string;
}

export interface PROPS_LIKE {
  likePortfolio: number;
}

export interface PROPS_AVATER {
  imgurl: string;
}

/*postSlice.ts*/
export interface PROPS_NEWPORTFOLIO {
  title: string;
  img: File | null;
}
//export interface PROPS_LIKED {
//  id: number;
//  title: string;
//  current: number[];
//  new: number;
//}
export interface PROPS_COMMENT {
  text: string;
  post: number;
}
/*Post.tsx*/
export interface PROPS_POST {
  postId: number;
  loginId: number;
  userPost: number;
  title: string;
  imageUrl: string;
  liked: number[];
}
