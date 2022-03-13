import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectCount } from '../app/store/slices/portfolioSlice';
import { addcount } from '../app/store/slices/portfolioSlice';

const Core: React.FC = () => {
  const portfolio = useSelector(selectCount);
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      <form>
        <label>
          Name:
          <input type='text' name='name' />
        </label>
        <input type='submit' value='Submit' />
      </form>
      <button
        className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
        onClick={() => dispatch(addcount())}
      >
        {portfolio}
      </button>
    </>
  );
};

export default Core;
