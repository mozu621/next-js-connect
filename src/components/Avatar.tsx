import Link from 'next/link';
import { PROPS_AVATER } from '../app/store/types';

export const Avatar: React.FC<PROPS_AVATER> = ({ imgurl, profileid }) => {
  return (
    <>
      <Link href={`/profile/${profileid}`} passHref>
        {imgurl ? (
          <img
            className='flex relative justify-center items-center w-12 h-12 text-xl text-white rounded-full border '
            src={imgurl}
          />
        ) : (
          <img
            className='flex object-contain relative justify-center items-center w-12 h-12 text-xl text-white rounded-full '
            src='http://127.0.0.1:8000/media/avatars/no-icon.png'
          />
        )}
      </Link>
    </>
  );
};
