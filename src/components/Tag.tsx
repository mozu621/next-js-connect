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
        <button className=' p-1 font-semibold text-white bg-gray-900 hover:bg-gray-600  '>
          {tagname}
        </button>
      </Link>
    </>
  );
};
