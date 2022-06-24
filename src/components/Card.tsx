import Link from 'next/link';
import { FaRegComment } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfiles } from '../app/store/slices/authSlice';
import { selectComments, selectOpenNewCommnet } from '../app/store/slices/portfolioSlice';
import { PROPS_CARD } from '../app/store/types';
import { Avatar } from './Avatar';
import { Like } from './Like';

export const Card: React.FC<PROPS_CARD> = ({ title, portfolioid, author, portfolioimg }) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);

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
        <div className='hover: overflow-hidden col-span-1 p-2 mx-auto max-w-2xl bg-stone-50 hover:bg-zinc-100 dark:bg-gray-800 drop-shadow-md hover:drop-shadow-2xl'>
          <img className='object-cover w-full h-64 rounded-lg' src={portfolioimg} alt='Article' />

          <div className=''>
            <div className='flex  '>
              <div className='flex flex-1'>
                <Link href={`/portfolio/${portfolioid}`} passHref>
                  <a className='block text-xl font-semibold text-black hover:text-blue-500 dark:text-white transition-colors duration-200'>
                    {title}
                  </a>
                </Link>
              </div>
              <div className='flex flex-row mx-auto'>
                <div className='mt-1'>
                  <FaRegComment />
                </div>
                <div className=' pr-3'>{commentsOnPortfolio.length}</div>
                <Like likePortfolio={portfolioid} />
              </div>
            </div>
            <div className='flex items-center'>
              {avatarprofileimg && <Avatar imgurl={avatarprofileimg} profileid={avatarprofileid} />}
              <a href='#' className='mx-2 font-semibold text-gray-700 dark:text-gray-200'>
                {avatarnicknname}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
