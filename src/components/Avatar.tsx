import Link from 'next/link';
import { PROPS_AVATER } from '../app/store/types';

export const Avatar: React.FC<PROPS_AVATER> = ({ imgurl, profileid }) => {
  return (
    <>
      <Link href={`/profile/${profileid}`} passHref>
        <img
          className='flex relative justify-center items-center m-1 mr-2 w-16 h-16 text-xl text-white rounded-full'
          src={imgurl}
        />
      </Link>
    </>
  );
};
