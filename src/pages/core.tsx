import { Formik } from 'formik';

import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Modal from 'react-modal';

import { useSelector, useDispatch } from 'react-redux';
import styles from '../../styles/Home.module.css';
import { AppDispatch } from '../app/store';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import {
  fetchAsyncNewPortfolio,
  fetchPostEnd,
  fetchPostStart,
  selectPortfolios,
  selectOpenNewCommnet,
  resetOpenNewComment,
  fetchAsyncPostComment,
} from '../app/store/slices/portfolioSlice';
import { PROPS_PORTFOLIO, PortfolioList } from '../app/store/types';
import { Avatar } from '../components/Avatar';
import { Card } from '../components/Card';
import { Like } from '../components/Like';

Modal.setAppElement('#__next');

const Home: NextPage = () => {
  const myprofile = useSelector(selectProfile);
  const profiles = useSelector(selectProfiles);
  const portfolios = useSelector(selectPortfolios);
  const dispatch: AppDispatch = useDispatch();
  const [modalData, setModalData] = useState(0);
  const openComment = useSelector(selectOpenNewCommnet);

  const [text, setText] = useState('');

  //検索機能
  const allportfolioList = portfolios;
  const [inputValue, setInputValue] = useState('');
  const [portfolioList, setPortfolioList] = useState<PROPS_PORTFOLIO[]>(allportfolioList);
  const search = (value: string) => {
    if (value !== '') {
      const filteredList = allportfolioList.filter((value: PROPS_PORTFOLIO) => {
        return value.title.toString().toLowerCase().includes(inputValue.toLowerCase());
      });
      setPortfolioList(filteredList);
      return;
    }

    setPortfolioList(allportfolioList);
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    search(e.target.value);
  };
  //↑ここまで検索機能

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <section className='relative py-4 px-5 mx-auto w-full max-w-md rounded-md'>
        <div className='relative'>
          <span className='flex absolute inset-y-0 left-0 items-center pl-3'>
            <FaSearch />
          </span>

          <input
            type='text'
            value={inputValue}
            onChange={handleChange}
            className='py-3 pr-4 pl-10 w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md border focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring'
            placeholder='タイトルで検索'
          />
        </div>
      </section>

      <div className='grid grid-cols-3 gap-2'>
        {portfolioList.map((portfolio, i) => (
          <div key={i}>
            <Card
              title={portfolio.title}
              portfolioid={portfolio.id}
              author={portfolio.author}
              portfolioimg={portfolio.img}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
