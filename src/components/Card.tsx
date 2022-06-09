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

          <div className='p-6'>
            <div>
              <Link href={`/portfolio/${portfolioid}`} passHref>
                <a
                  href='#'
                  className='block mt-2 text-2xl font-semibold text-blue-600 hover:text-blue-500 dark:text-white hover:underline transition-colors duration-200'
                >
                  {title}
                </a>
              </Link>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem
                ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In
                pretium nec senectus erat. Et malesuada lobortis.
              </p>
            </div>

            <div className='mt-4'>
              <div className='flex items-center'>
                <div className='flex items-center'>
                  <FaRegComment />
                  {portfolioid}
                  <div>{commentsOnPortfolio.length}</div>
                  <Like likePortfolio={portfolioid} />
                  {avatarprofileimg && (
                    <Avatar imgurl={avatarprofileimg} profileid={avatarprofileid} />
                  )}
                  <a href='#' className='mx-2 font-semibold text-gray-700 dark:text-gray-200'>
                    {avatarnicknname}
                  </a>
                </div>

                <span className='mx-1 text-xs text-gray-600 dark:text-gray-300'>21 SEP 2015</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
