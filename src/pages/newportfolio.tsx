import { Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          url: '',
          content: '',
          img: null,
        }}
        onSubmit={async (values) => {
          await dispatch(fetchPostStart());
          const result = await dispatch(fetchAsyncNewPortfolio(values));
          await dispatch(fetchPostEnd());
          if (fetchAsyncNewPortfolio.fulfilled.match(result)) {
            await router.push('/core');
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='flex flex-col'>
            <div className='m-5 text-2xl font-extrabold text-center'>ポートフォリオ新規登録</div>
            <div className='mb-6 lg:mx-48'>
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                ポートフォリオ名
              </label>
              <input
                placeholder='ポートフォリオ名を入力してください'
                type='text'
                onChange={props.handleChange}
                value={props.values.title}
                name='title'
                className='block p-2.5 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
              />
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                URL
              </label>
              <input
                placeholder='ポートフォリオのURLを入力してください'
                type='text'
                onChange={props.handleChange}
                value={props.values.url}
                name='url'
                className='block p-2.5 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
              />
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                ポートフォリオ内容
              </label>
              <textarea
                placeholder='ポートフォリオの内容を入力してください'
                onChange={props.handleChange}
                value={props.values.content}
                name='content'
                className='block p-4 w-full text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500 '
              />

              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                画像
              </label>
              <input
                type='file'
                name='img'
                onChange={(e) =>
                  props.setFieldValue(
                    'img',
                    e.currentTarget.files !== null ? e.currentTarget.files[0] : null,
                  )
                }
              />
            </div>
            <button
              className='py-2 px-6 mx-auto mb-5 font-semibold text-white bg-gray-800 hover:bg-gray-900 rounded-full border border-gray-400 shadow'
              type='submit'
            >
              登録
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Newportfolio;
