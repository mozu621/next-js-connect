import Image from 'next/image';
import { PROPS_AVATER } from '../src/app/store/types';

export const Avatar: React.FC<PROPS_AVATER> = ({ imgurl }) => {
  return (
    <>
      <img
        className='flex relative justify-center items-center m-1 mr-2 w-16 h-16 text-xl text-white rounded-full'
        src={imgurl}
      />
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
