import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfiles } from '../app/store/slices/authSlice';
import {
  selectPortfolios,
  selectComments,
  selectOpenNewCommnet,
  resetOpenNewComment,
  fetchAsyncPostComment,
  setOpenNewComment,
} from '../app/store/slices/portfolioSlice';
import { PROPS_COMMENT } from '../app/store/types';
import { Avatar } from './Avatar';

export const Comment: React.FC<PROPS_COMMENT> = ({ text, commentPortfolio, commentUser }) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);

  const commentUserprofile = profiles.filter((profile) => {
    return profile.profileUser === commentUser;
  });

  const commentUserprofileimgs = commentUserprofile.map((obj) => obj.img);
  const commentUserprofileids = commentUserprofile.map((obj) => obj.id);
  const commentUsernicknnames = commentUserprofile.map((obj) => obj.nickName);

  const commentUserprofileimg = commentUserprofileimgs[0];
  const commentUserprofileid = commentUserprofileids[0];
  const commentUsernicknname = commentUsernicknnames[0];

  return (
    <>
      <div className='py-4 px-8 mx-auto max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md'>
        <div className='flex justify-between items-center'>
          <span className='text-sm font-light text-gray-600 dark:text-gray-400'>Mar 10, 2019</span>
        </div>

        <div className='mt-2'>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>{text}</p>
        </div>

        <div className='flex justify-between items-center mt-4'>
          <div className='flex items-center'>
            <Avatar imgurl={commentUserprofileimg} profileid={commentUserprofileid} />
            <a className='font-bold text-gray-700 dark:text-gray-200 cursor-pointer'>
              {commentUsernicknname}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
