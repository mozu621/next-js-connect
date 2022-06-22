import { Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  selectProfile,
  selectProfiles,
  selectOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncUpdateProf,
  resetOpenProfile,
  editNickname,
} from '../app/store/slices/authSlice';
import {
  fetchAsyncNewPortfolio,
  fetchPostEnd,
  fetchPostStart,
  selectPortfolios,
} from '../app/store/slices/portfolioSlice';

const EditProfile: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [image, setImage] = useState(null);
  const router = useRouter();
  //const updateProfile = async (e: React.MouseEvent<HTMLElement>) => {
  //  e.preventDefault();
  //  const packet = {
  //    id: profile.id,
  //    nickName: profile.nickName,
  //    img: image,
  //    introduction: profile.introduction,
  //    githuburl: profile.githuburl,
  //    twitterurl: profile.twitterurl,
  //  };

  //  await dispatch(fetchCredStart());
  //  await dispatch(fetchAsyncUpdateProf(packet));
  //  await dispatch(fetchCredEnd());
  //  await dispatch(resetOpenProfile());
  //};

  const handlerEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput?.click();
  };

  return (
    <>
      <Formik
        initialValues={{
          id: profile.id,
          nickName: profile.nickName,
          img: null,
          introduction: profile.introduction,
          githuburl: profile.githuburl,
          twitterurl: profile.twitterurl,
        }}
        onSubmit={async (values) => {
          await dispatch(fetchPostStart());
          const result = await dispatch(fetchAsyncUpdateProf(values));
          await dispatch(fetchPostEnd());
          if (fetchAsyncUpdateProf.fulfilled.match(result)) {
            await router.push('/core');
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='flex flex-col'>
            <div className='mb-6 lg:mx-32'>
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                プロフィール名
              </label>
              <input
                placeholder='プロフィール名を入力してください'
                type='text'
                onChange={props.handleChange}
                value={props.values.nickName}
                name='nickName'
                className='block p-2.5 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
              />
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                自己紹介
              </label>
              <textarea
                placeholder='自己紹介文を入力してください'
                onChange={props.handleChange}
                value={props.values.introduction}
                name='introduction'
                className='block py-10 px-1 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
              />
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                GitHub URL
              </label>
              <input
                placeholder='GitHub URLを入力してください'
                type='text'
                onChange={props.handleChange}
                value={props.values.githuburl}
                name='nickName'
                className='block p-2.5 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
              />
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                Twitter URL
              </label>
              <input
                placeholder='Twitter URLを入力してください'
                type='text'
                onChange={props.handleChange}
                value={props.values.twitterurl}
                name='nickName'
                className='block p-2.5 w-full text-base text-gray-900 dark:text-white dark:placeholder:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:ring-blue-500 dark:focus:ring-blue-500'
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
              変更
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
