import { Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import {
  fetchAsyncNewPortfolio,
  fetchPostEnd,
  fetchPostStart,
  selectPortfolios,
} from '../app/store/slices/portfolioSlice';

const Newportfolio: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Formik
        initialValues={{ title: '', img: null }}
        onSubmit={async (values) => {
          await dispatch(fetchPostStart());
          const result = await dispatch(fetchAsyncNewPortfolio(values));
          await dispatch(fetchPostEnd());
        }}
      >
        {(props) => (
          <section className='mt-10'>
            <form onSubmit={props.handleSubmit} className='flex flex-col'>
              <div className='pt-3 mb-6 bg-gray-200 rounded'>
                <label className='block mb-2 ml-3 text-sm font-bold text-gray-700'>title</label>
                <input
                  type='text'
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.title}
                  name='title'
                  className='px-3 pb-3 w-full text-gray-700 bg-gray-200 rounded border-b-4 border-gray-300 focus:border-purple-600 focus:outline-none transition duration-500'
                />
              </div>

              <button
                className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
                type='submit'
              >
                Create
              </button>
            </form>
          </section>
        )}
      </Formik>
    </>
  );
};

export default Newportfolio;
