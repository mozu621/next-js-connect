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
        <button className='py-1 px-3 text-xs text-blue-800 dark:text-blue-900 bg-blue-200 hover:bg-blue-700 dark:bg-blue-300 rounded-full'>
          {tagname}
        </button>
      </Link>
    </>
  );
};
