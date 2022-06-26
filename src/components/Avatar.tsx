import Link from 'next/link';
import { PROPS_AVATER } from '../app/store/types';

export const Avatar: React.FC<PROPS_AVATER> = ({ imgurl, profileid }) => {
  return (
    <>
      <Link href={`/profile/${profileid}`} passHref>
        <img
          className='flex relative justify-center items-center w-12 h-12 text-xl text-white rounded-full'
          src={imgurl}
        />
      </Link>
    </>
  );
};
