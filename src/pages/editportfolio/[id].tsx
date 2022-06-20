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
  fetchPostEnd,
  fetchPostStart,
  selectPortfolios,
} from '../../app/store/slices/portfolioSlice';
import { PROPS_PORTFOLIO, TAG } from '../../app/store/types';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  portfolio: PROPS_PORTFOLIO;
}

const EditPortfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const openProfile = useSelector(selectOpenProfile);
  const profile = useSelector(selectProfile);
  const [image, setImage] = useState(null);
  const Portfolios = useSelector(selectPortfolios);

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
          <section className='mt-10'>
            <form onSubmit={props.handleSubmit} className='flex flex-col'>
              <div className='pt-3 mb-6 bg-gray-200 rounded'>
                <label className='block mb-2 ml-3 text-sm font-bold text-gray-700'>title</label>
                <input
                  placeholder='title'
                  type='text'
                  onChange={props.handleChange}
                  value={props.values.title}
                  name='title'
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
