import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../app/store';

import { fetchAsyncGetProfs, selectProfile } from '../../app/store/slices/authSlice';
import {
  selectComments,
  fetchAsyncPostComment,
  fetchAsyncPostTag,
  fetchAsyncGetTags,
  selectTags,
  setOpenNewTagPost,
  resetOpenNewTagPost,
  selectOpenNewTagPost,
} from '../../app/store/slices/portfolioSlice';
import { PROPS_PORTFOLIO, TAG } from '../../app/store/types';
import { Comment } from '../../components/Comment';
import { Tag } from '../../components/Tag';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  portfolio: PROPS_PORTFOLIO;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments);
  const tags = useSelector(selectTags);
  const myprofile = useSelector(selectProfile);
  const openNewTagPost = useSelector(selectOpenNewTagPost);

  const commentsOnPortfolio = comments.filter((comment) => {
    return comment.commentPortfolio === portfolio.id;
  });

  const tagsOnPortfolio = tags.filter((tag) => {
    return tag.tagPortfolio.id === portfolio.id;
  });

  const [text, setText] = useState('');

  const postComment = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { text: text, commentPortfolio: portfolio.id };
    await dispatch(fetchAsyncPostComment(packet));
    setText('');
  };

  const [tagname, setTagname] = useState('');

  const postTag = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { tagname: tagname, tagPortfolio: portfolio.id };
    await dispatch(fetchAsyncPostTag(packet));
    await dispatch(fetchAsyncGetTags());
    setTagname('');
    await dispatch(resetOpenNewTagPost());
  };

  return (
    <>
      <Modal //isopenにtrue false で表示切り替えができる
        isOpen={openNewTagPost}
        onRequestClose={async () => {
          await dispatch(resetOpenNewTagPost());
        }}
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
          },
          content: {
            position: 'absolute',
            top: '15rem',
            left: '20rem',
            right: '20rem',
            bottom: '15rem',
            borderRadius: '1rem',
            padding: '1.5rem',
          },
        }}
      >
        <form>
          <input
            type='text'
            placeholder='add a tag'
            value={tagname}
            onChange={(e) => setTagname(e.target.value)}
          />
          <button
            className='py-2 px-4 font-bold bg-red-500 hover:bg-red-700 rounded-full '
            disabled={!tagname.length}
            type='button'
            onClick={postTag}
          >
            追加
          </button>
        </form>
      </Modal>

      <section className='text-gray-600 '>
        <div className='container flex flex-col items-center p-12 mx-auto md:flex-row'>
          <div className='mb-10 w-5/6 md:mb-0 md:w-1/2 lg:w-full lg:max-w-lg'>
            {portfolio.img ? (
              <img className='object-cover w-full h-64' src={portfolio.img} alt='Article' />
            ) : (
              <img
                className='object-contain w-full h-64 border'
                src='http://127.0.0.1:8000/media/portfolios/noimage2.png'
                alt='Article'
              />
            )}
          </div>
          <div className='flex flex-col items-center text-center md:items-start md:pl-16 md:w-1/2 md:text-left lg:grow lg:pl-24'>
            <h1 className='mb-4 text-3xl font-medium text-gray-900 sm:text-4xl '>
              {portfolio.title}
            </h1>
            {portfolio.author == myprofile.profileUser && (
              <Link href={`/editportfolio/${portfolio.id}`} passHref>
                <button className='py-2 px-4 mb-5 ml-auto font-semibold text-gray-800 bg-white hover:bg-gray-100 rounded-full border border-gray-400 shadow'>
                  編集
                </button>
              </Link>
            )}
            <p className='mb-8 leading-relaxed'>
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed
              tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken
              authentic tumeric truffaut hexagon try-hard chambray.
            </p>
            <div className='flex flex-wrap'>
              {tagsOnPortfolio.map((tag, i) => (
                <div key={i} className='p-0.5'>
                  <Tag id={tag.id} tagPortfolio={tag.tagPortfolio} tagname={tag.tagname} />
                </div>
              ))}
              {portfolio.author == myprofile.profileUser && (
                <button
                  className='p-2 ml-3 align-middle rounded-full border-2 border-gray-400 shadow'
                  onClick={async () => {
                    await dispatch(setOpenNewTagPost());
                  }}
                >
                  <FaPlus />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <form className='px-4 pt-2 w-full max-w-xl bg-white rounded-lg'>
        <div className='flex flex-wrap -mx-3 mb-6'>
          <div className='px-3 my-2 w-full md:w-full'>
            <textarea
              className='py-2 px-3 w-full h-20 font-medium leading-normal placeholder:text-gray-700 bg-gray-100 focus:bg-white rounded border border-gray-400 focus:outline-none resize-none'
              placeholder='コメントを入力してください'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className='flex items-start px-3 w-full md:w-full'>
            <div className='-mr-1'>
              <button
                className='py-1 px-4 mr-1 font-medium tracking-wide text-gray-700 bg-white hover:bg-gray-100 rounded-lg border border-gray-400'
                disabled={!text.length}
                type='button'
                onClick={postComment}
              >
                コメントする
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className='m-5 text-2xl font-extrabold text-center'>コメント一覧</div>
      {commentsOnPortfolio.map((comment, i) => (
        <div key={i}>
          <Comment
            commentid={comment.id}
            commentUser={comment.commentUser}
            text={comment.text}
            commentPortfolio={portfolio.id}
          />
        </div>
      ))}
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

export default Portfolio;
