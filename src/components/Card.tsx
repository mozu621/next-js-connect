import Link from 'next/link';
import { FaRegComment } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfiles } from '../app/store/slices/authSlice';
import { selectComments, selectTags } from '../app/store/slices/portfolioSlice';
import { PROPS_CARD } from '../app/store/types';
import { Avatar } from './Avatar';
import { Like } from './Like';
import { Tag } from './Tag';

export const Card: React.FC<PROPS_CARD> = ({ title, portfolioid, author, portfolioimg }) => {
  const dispatch: AppDispatch = useDispatch();
  const profiles = useSelector(selectProfiles);
  const comments = useSelector(selectComments);
  const tags = useSelector(selectTags);

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

  const tagsOnPortfolio = tags.filter((tag) => {
    return tag.tagPortfolio.id === portfolioid;
  });

  return (
    <>
      {portfolioimg && (
        <div className='hover: overflow-hidden col-span-1 self-auto p-4 mx-auto max-w-2xl bg-stone-50 hover:bg-zinc-100 dark:bg-gray-800 hover:drop-shadow-2xl'>
          <img className='object-cover w-full h-40' src={portfolioimg} alt='Article' />

          <div className='px-2'>
            <div className='flex mt-3 mb-10'>
              <div className='flex flex-1'>
                <Link href={`/portfolio/${portfolioid}`} passHref>
                  <a className='block text-lg font-semibold text-black hover:text-blue-500 dark:text-white transition-colors duration-200'>
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
            <div className='flex flex-wrap'>
              {tagsOnPortfolio.map((tag, i) => (
                <div key={i} className='p-0.5'>
                  <Tag id={tag.id} tagPortfolio={tag.tagPortfolio} tagname={tag.tagname} />
                </div>
              ))}
            </div>
            <div className='flex items-center mb-2 '>
              {avatarprofileimg && <Avatar imgurl={avatarprofileimg} profileid={avatarprofileid} />}
              <a className='mx-2 text-sm text-gray-500'>{avatarnicknname}</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
