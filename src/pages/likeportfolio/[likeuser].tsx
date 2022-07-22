import console from 'console';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { fetchAsyncGetProfs } from '../../app/store/slices/authSlice';
import { PROPS_TAG } from '../../app/store/types';
import { Card } from '../../components/Card';
import { Likeportfolio } from '../../components/Likeportfolio';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  filterlikeportfolio: any;
}

const FilterLikePortfolioData: React.FC<PortfolioProps> = ({ filterlikeportfolio }) => {
  return (
    <>
      <div className='m-5 text-2xl font-extrabold text-center'>お気に入り一覧</div>
      <div className='flex flex-wrap'>
        {filterlikeportfolio.map((like, i) => (
          <div key={i} className='flex lg:w-1/4'>
            <Likeportfolio likeportfolioid={like.likePortfolio} />
          </div>
        ))}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ profileUser: string }> = async () => {
  const res = await fetch(`${apiUrl}api/profile`, {
    credentials: 'include',
  });

  const profile = await res.json();
  const paths = profile.map((a) => {
    return { params: { likeuser: a.profileUser.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}api/likeportfolio/?likeUser=${params.likeuser}`);
  const filterlikeportfolio = await res.json();
  return {
    props: { filterlikeportfolio },
    revalidate: 1,
  };
};

export default FilterLikePortfolioData;
