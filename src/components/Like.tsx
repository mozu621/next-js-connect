import Link from 'next/link';
import { ReactElement, useState } from 'react';
import { IconContext } from 'react-icons';

import { FaRegHeart, FaHeart } from 'react-icons/fa';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfile } from '../app/store/slices/authSlice';
import {
  fetchAsyncNewLike,
  selectLikes,
  fetchAsyncDeleteLike,
  fetchAsyncGetLikes,
  selectOpenLikeuser,
  setOpenLikeuser,
  resetOpenLikeuser,
} from '../app/store/slices/portfolioSlice';
import { PROPS_LIKE } from '../app/store/types';
import { Likeuser } from './Likeuser';

export const Like: React.FC<PROPS_LIKE> = ({ likePortfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const likes = useSelector(selectLikes);
  const myprofile = useSelector(selectProfile);
  const openLikeuser = useSelector(selectOpenLikeuser);

  //１つのポートフォリオに関してのlike取得
  const likeUsersOnPortfolio = likes.filter((like) => {
    return like.likePortfolio === likePortfolio;
  });

  //消したいlikeを取得(配列,オブジェクト)(自分がいいねしたポートフォリオを取得している)
  const selectedLike = likeUsersOnPortfolio.filter((like) => {
    return like.likeUser === myprofile.profileUser;
  });

  const likeusers = selectedLike.map((selectedlike) => selectedlike.likeUser);

  //いいね機能
  const handlerLike = () => {
    //オブジェクトからidを取り出した(まだ配列！！)
    const deletelikeid = selectedLike.map((selectedlike) => selectedlike.id);

    //オブジェクトからuserを取り出した(まだ配列！！)

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
        {likeusers.includes(myprofile.profileUser) ? (
          <div className='mt-1 text-rose-500'>
            <FaHeart />
          </div>
        ) : (
          <div className='mt-1'>
            <FaRegHeart />
          </div>
        )}
      </button>

      <Link href={`/likeuserlist/${likePortfolio}`} passHref>
        {likeusers.includes(myprofile.profileUser) ? (
          <div className='text-rose-500'>{likeUsersOnPortfolio.length}</div>
        ) : (
          <div>{likeUsersOnPortfolio.length}</div>
        )}
      </Link>
    </>
  );
};
