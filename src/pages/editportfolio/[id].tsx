import { Formik } from 'formik';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  selectProfile,
  selectProfiles,
  selectOpenProfile,
  fetchCredStart,
  fetchCredEnd,
  fetchAsyncUpdateProf,
  resetOpenProfile,
  editNickname,
} from '../../app/store/slices/authSlice';
import {
  fetchAsyncNewPortfolio,
  fetchAsyncUpdatePortfolio,
  selectTags,
  fetchPostEnd,
  fetchPostStart,
  fetchAsyncPostTag,
  fetchAsyncGetTags,
  selectPortfolios,
} from '../../app/store/slices/portfolioSlice';
import { PROPS_PORTFOLIO, PORTFOLIO, TAG } from '../../app/store/types';
import { Tag } from '../../components/Tag';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  portfolio: PROPS_PORTFOLIO;
}

const EditPortfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const tags = useSelector(selectTags);
  const tagsOnPortfolio = tags.filter((tag) => {
    return tag.tagPortfolio.id === portfolio.id;
  });
  const [tagname, setTagname] = useState('');

  const postTag = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { tagname: tagname, tagPortfolio: portfolio.id };
    await dispatch(fetchAsyncPostTag(packet));
    await dispatch(fetchAsyncGetTags());
    setTagname('');
  };

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
          id: portfolio.id,
          title: portfolio.title,
          url: portfolio.url,
          content: portfolio.content,
          img: null,
        }}
        onSubmit={async (values) => {
          await dispatch(fetchPostStart());
          const result = await dispatch(fetchAsyncUpdatePortfolio(values));
          await dispatch(fetchPostEnd());
          if (fetchAsyncUpdatePortfolio.fulfilled.match(result)) {
            await router.push('/core');
          }
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className='flex flex-col'>
            <div className='m-5 text-2xl font-extrabold text-center'>ポートフォリオ編集</div>
            <div className='mb-6 lg:mx-32'>
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
                placeholder='URLを入力してください'
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
            <div className=' mb-6 lg:mx-32'>
              <label className='block my-2 text-base font-medium text-gray-900 dark:text-gray-300'>
                タグ
              </label>
              <div className='flex flex-wrap '>
                {tagsOnPortfolio.map((tag, i) => (
                  <div key={i} className='p-0.5'>
                    <Tag id={tag.id} tagPortfolio={tag.tagPortfolio} tagname={tag.tagname} />
                  </div>
                ))}
              </div>
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

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const res = await fetch(`${apiUrl}api/portfolio`, {
    credentials: 'include',
  });

  const portfolios = await res.json();
  const paths = portfolios.map((a) => {
    return { params: { id: a.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}api/portfolio/${params.id}`);
  const portfolio = await res.json();

  return {
    props: { portfolio },
    revalidate: 1,
  };
};

export default EditPortfolio;
