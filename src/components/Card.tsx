import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import { selectPortfolios } from '../app/store/slices/portfolioSlice';
import { PROPS_CARD } from '../app/store/types';
import { Avatar } from './Avatar';
import { Like } from './Like';

export const Card: React.FC<PROPS_CARD> = ({ portfolioid, author, portfolioimg }) => {
  const profiles = useSelector(selectProfiles);
  const portfolios = useSelector(selectPortfolios);

  //avatarに渡すprofile情報を定義した
  const avatarprofile = profiles.filter((profile) => {
    return profile.profileUser === author;
  });
  //avatarに渡す　imgのurl　profile情報に遷移するための　id を定義した
  const avatarprofileimgs = avatarprofile.map((obj) => obj.img);
  const avatarprofileids = avatarprofile.map((obj) => obj.id);
  const avatarnicknnames = avatarprofile.map((obj) => obj.nickName);

  const avatarprofileimg = avatarprofileimgs[0];
  const avatarprofileid = avatarprofileids[0];
  const avatarnicknname = avatarnicknnames[0];

  return (
    <>
      {portfolioimg && (
        <div>
          <img className='object-cover w-full h-64' src={portfolioimg} alt='Article' />

          <div className='p-6'>
            <div>
              <span className='text-xs font-medium text-blue-600 dark:text-blue-400 uppercase'>
                Product
              </span>
              <a
                href='#'
                className='block mt-2 text-2xl font-semibold text-gray-800 hover:text-gray-600 dark:text-white hover:underline transition-colors duration-200'
              >
                I Built A Successful Blog In One Year
              </a>
              <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Molestie parturient et sem
                ipsum volutpat vel. Natoque sem et aliquam mauris egestas quam volutpat viverra. In
                pretium nec senectus erat. Et malesuada lobortis.
              </p>
            </div>

            <div className='mt-4'>
              <div className='flex items-center'>
                <div className='flex items-center'>
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
