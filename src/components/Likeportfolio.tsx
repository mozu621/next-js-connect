import Link from 'next/link';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectProfile, selectProfiles } from '../app/store/slices/authSlice';
import { selectPortfolios } from '../app/store/slices/portfolioSlice';
import { PROPS_LIKEPORTFOLIO } from '../app/store/types';
import { Card } from './Card';

export const Likeportfolio: React.FC<PROPS_LIKEPORTFOLIO> = ({ likeportfolioid }) => {
  const portfolios = useSelector(selectPortfolios);
  const filterlikeportfolio = portfolios.filter((portfolio) => {
    return portfolio.id === likeportfolioid;
  });

  return (
    <>
      {filterlikeportfolio.map((portfolio, i) => (
        <div key={i}>
          <Card
            title={portfolio.title}
            portfolioid={portfolio.id}
            author={portfolio.author}
            portfolioimg={portfolio.img}
          />
        </div>
      ))}
    </>
  );
};
