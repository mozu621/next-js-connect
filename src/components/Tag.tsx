import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectTags } from '../app/store/slices/portfolioSlice';
import { PROPS_TAG } from '../app/store/types';

export const Tag: React.FC<PROPS_TAG> = ({ tagname }) => {
  return (
    <>
      <Link href={`/filter/${tagname}`} passHref>
        <button className='p-0.5 px-2 mx-1 text-xs text-blue-900 hover:bg-gray-200 rounded-full border border-blue-900'>
          {tagname}
        </button>
      </Link>
    </>
  );
};
