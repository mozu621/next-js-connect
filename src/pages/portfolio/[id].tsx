import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AppDispatch } from '../../app/store';

import { fetchAsyncGetProfs } from '../../app/store/slices/authSlice';
import {
  selectComments,
  fetchAsyncPostComment,
  fetchAsyncPostTag,
  selectTags,
} from '../../app/store/slices/portfolioSlice';
import { PROPS_PORTFOLIO, TAG } from '../../app/store/types';
import { Comment } from '../../components/comment';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  portfolio: PROPS_PORTFOLIO;
}

const Portfolio: React.FC<PortfolioProps> = ({ portfolio }) => {
  const dispatch: AppDispatch = useDispatch();
  const comments = useSelector(selectComments);
  const tags = useSelector(selectTags);

  const commentsOnPortfolio = comments.filter((comment) => {
    return comment.commentPortfolio === portfolio.id;
  });

  const tagsOnPortfolio = tags.filter((tag) => {
    return tag.tagPortfolio === portfolio.id;
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
    setTagname('');
  };

  return (
    <>
      <img className='object-cover w-full h-64' src={portfolio.img} alt='Article' />
      {portfolio.id}#######
      {portfolio.title}
      {portfolio.author}です
      {tagsOnPortfolio.map((tag, i) => (
        <div key={i}>{tag.tagname}</div>
      ))}
      <form>
        <input
          type='text'
          placeholder='add a comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className='py-2 px-4 font-bold bg-blue-500 hover:bg-blue-700 rounded-full '
          disabled={!text.length}
          type='button'
          onClick={postComment}
        >
          Post
        </button>
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
          tagcreate
        </button>
      </form>
      {commentsOnPortfolio.map((comment, i) => (
        <div key={i}>
          <Comment
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
