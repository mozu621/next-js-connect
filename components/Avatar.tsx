import Link from 'next/link';
import { PROPS_AVATER } from '../src/app/store/types';

export const Avatar: React.FC<PROPS_AVATER> = ({ imgurl }) => {
  return (
    <>
      <Link href='/profile'>
        <img
          className='flex relative justify-center items-center m-1 mr-2 w-16 h-16 text-xl text-white rounded-full'
          src={imgurl}
        />
      </Link>
    </>
  );
};

//<Image
//  className='flex relative justify-center items-center m-1 mr-2 w-16 h-16 text-xl text-white rounded-full'
//  src={img}
//  alt=''
//  height={50}
//  width={50}
///>
