import { profile } from 'console';
import { Formik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import { useRouter } from 'next/router';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  fetchCredStart,
  fetchAsyncRegister,
  fetchAsyncLogin,
  fetchAsyncCreateProf,
  fetchAsyncGetProfs,
  fetchAsyncGetMyProf,
  fetchCredEnd,
} from '../app/store/slices/authSlice';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import {
  fetchAsyncGetPortfolios,
  selectPortfolios,
  fetchAsyncGetLikes,
  fetchAsyncGetComments,
} from '../app/store/slices/portfolioSlice';

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const profile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const portfolios = useSelector(selectPortfolios);

  return (
    <>
      <main className='p-8 my-10 mx-auto max-w-lg bg-white rounded-lg shadow-2xl md:p-12'>
        <section>
          <h3 className='text-2xl font-bold'>ようこそ Connect へ</h3>

          <p className='pt-2 text-gray-600'>ログイン</p>
        </section>
        <Formik
          initialErrors={{ email: 'イニシャルエラーが表示されている入力してくださいrequired' }}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            await dispatch(fetchCredStart());
            const result = await dispatch(fetchAsyncLogin(values));
            if (fetchAsyncLogin.fulfilled.match(result)) {
              await dispatch(fetchAsyncGetProfs());
              await dispatch(fetchAsyncGetMyProf());
              await dispatch(fetchAsyncGetPortfolios());
              await dispatch(fetchAsyncGetLikes());
              await dispatch(fetchAsyncGetComments());
              await router.push('/core');
            }
            await dispatch(fetchCredEnd());
          }}
        >
          {(props) => (
            <section className='mt-10'>
              <form onSubmit={props.handleSubmit} className='flex flex-col'>
                <div className='pt-3 mb-6 bg-gray-200 rounded'>
                  <label className='block mb-2 ml-3 text-sm font-bold text-gray-700'>Email</label>
                  <input
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name='email'
                    className='px-3 pb-3 w-full text-gray-700 bg-gray-200 rounded border-b-4 border-gray-300 focus:border-purple-600 focus:outline-none transition duration-500'
                  />
                </div>
                <div className='pt-3 mb-6 bg-gray-200 rounded'>
                  <label className='block mb-2 ml-3 text-sm font-bold text-gray-700'>
                    Password
                  </label>
                  <input
                    type='text'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name='password'
                    className='px-3 pb-3 w-full text-gray-700 bg-gray-200 rounded border-b-4 border-gray-300 focus:border-purple-600 focus:outline-none transition duration-500'
                  />
                </div>
                {props.errors.email && <div id='feedback'>{props.errors.email}</div>}

                <button
                  className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
                  type='submit'
                >
                  ログインする
                </button>

                <div className='flex justify-end'>
                  <a
                    href='#'
                    className='mb-6 text-sm text-purple-600 hover:text-purple-700 hover:underline'
                  >
                    Forgot your password?
                  </a>
                </div>
                <div>アカウントをお持ちでない方</div>
                <Link href='/signup' passHref>
                  <button
                    className='py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded shadow-lg hover:shadow-xl transition duration-200'
                    type='submit'
                  >
                    会員登録
                  </button>
                </Link>
              </form>
            </section>
          )}
        </Formik>
      </main>
    </>
  );
};

export default Login;
