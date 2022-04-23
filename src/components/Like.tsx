import { ReactElement } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfile } from '../app/store/slices/authSlice';
import {
  fetchAsyncNewLike,
  selectLikes,
  fetchAsyncDeleteLike,
  fetchAsyncGetLikes,
} from '../app/store/slices/portfolioSlice';

import { PROPS_LIKE } from '../app/store/types';

export const Like: React.FC<PROPS_LIKE> = ({ likePortfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const myprofile = useSelector(selectProfile);

  //１つのポートフォリオに関してのuser取得
  const likeUsersOnPortfolio = likes.filter((like) => {
    return like.likePortfolio === likePortfolio;
  });

  //消したいlikeを取得(配列,オブジェクト)
  const selectedLike = likeUsersOnPortfolio.filter((like) => {
    return like.likeUser === myprofile.profileUser;
  });

  //いいね機能
  const handlerLike = () => {
    //オブジェクトからidを取り出した(まだ配列！！)
    const deletelikeid = selectedLike.map((selectedlike) => selectedlike.id);

    //オブジェクトからuserを取り出した(まだ配列！！)
    const likeusers = selectedLike.map((selectedlike) => selectedlike.likeUser);

    //削除するidを取得する（ここでnember!!）
    const delete_like_id = deletelikeid[0];

    //いいね追加
    const CreateLike = async () => {
      const packet = {
        likePortfolio: likePortfolio,
      };
      await dispatch(fetchAsyncNewLike(packet));
    };

    //いいね削除
    const DeleteLike = async () => {
      await dispatch(fetchAsyncDeleteLike(delete_like_id));
      await dispatch(fetchAsyncGetLikes());
    };

    //いいねの分岐の処理
    if (likeusers.includes(myprofile.profileUser)) {
      DeleteLike();
    } else {
      CreateLike();
    }
  };

  return (
    <>
      <button onClick={handlerLike} type='button'>
        <FaRegHeart />
        <div>{likeUsersOnPortfolio.length}</div>
      </button>
      {likeUsersOnPortfolio.map((like, i) => (
        <div key={i}>
          <div>{like.likeUser}</div>
        </div>
      ))}
    </>
  );
};
