import Link from 'next/link';
import { useState } from 'react';
import { FaRegComment } from 'react-icons/fa';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import {
  selectPortfolios,
  selectComments,
  selectOpenNewCommnet,
  resetOpenNewComment,
  fetchAsyncPostComment,
  setOpenNewComment,
} from '../app/store/slices/portfolioSlice';
import { PROPS_CARD } from '../app/store/types';
import { Avatar } from './Avatar';
import { Like } from './Like';

export const Card: React.FC<PROPS_CARD> = ({ title, portfolioid, author, portfolioimg }) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const openComment = useSelector(selectOpenNewCommnet);

  //avatarに渡すprofile情報を定義した
  const avatarprofile = profiles.filter((profile) => {
    return profile.profileUser === author;
  });
  //avatarに渡すimgのurlprofile情報に遷移するためのidを定義した
  const avatarprofileimgs = avatarprofile.map((obj) => obj.img);
  const avatarprofileids = avatarprofile.map((obj) => obj.id);
  const avatarnicknnames = avatarprofile.map((obj) => obj.nickName);

  const avatarprofileimg = avatarprofileimgs[0];
  const avatarprofileid = avatarprofileids[0];
  const avatarnicknname = avatarnicknnames[0];

  const commentsOnPortfolio = comments.filter((comment) => {
    return comment.commentPortfolio === portfolioid;
  });

  return (
    <>
      {portfolioimg && (
        <div className='hover: overflow-hidden col-span-1 p-2 mx-auto max-w-2xl bg-stone-50 hover:bg-zinc-100 dark:bg-gray-800 rounded-lg drop-shadow-md hover:drop-shadow-2xl'>
          <img className='object-cover w-full h-64 rounded-lg' src={portfolioimg} alt='Article' />

          <div className=''>
            <div className='flex flex-col '>
              <div>
                <Link href={`/portfolio/${portfolioid}`} passHref>
                  <a
                    href='#'
                    className='block mt-2 text-2xl font-semibold text-blue-600 hover:text-blue-500 dark:text-white hover:underline transition-colors duration-200'
                  >
                    {title}
                  </a>
                </Link>
              </div>
              <div className='flex '>
                <div className='mt-1'>
                  <FaRegComment />
                </div>
                <div className=' pr-3'>{commentsOnPortfolio.length}</div>
                <Like likePortfolio={portfolioid} />
              </div>
              <div className='flex items-center'>
                {avatarprofileimg && (
                  <Avatar imgurl={avatarprofileimg} profileid={avatarprofileid} />
                )}
                <a href='#' className='mx-2 font-semibold text-gray-700 dark:text-gray-200'>
                  {avatarnicknname}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
