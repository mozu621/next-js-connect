import { Formik } from 'formik';
import type { NextPage } from 'next';
import Head from 'next/head';
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
          introduction: '',
          githuburl: '',
          twitterurl: '',
        }}
        onSubmit={async (values) => {
          await dispatch(fetchPostStart());
          const result = await dispatch(fetchAsyncUpdateProf(values));
          await dispatch(fetchPostEnd());
        }}
      >
        {(props) => (
          <section className='mt-10'>
            <form onSubmit={props.handleSubmit} className='flex flex-col'>
              <div className='pt-3 mb-6 bg-gray-200 rounded'>
                <label className='block mb-2 ml-3 text-sm font-bold text-gray-700'>title</label>
                <input
                  placeholder='nickname'
                  type='text'
                  onChange={props.handleChange}
                  value={props.values.nickName}
                  name='nickName'
                />
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

export default EditProfile;
