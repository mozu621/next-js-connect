import console from 'console';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { fetchAsyncGetProfs } from '../../app/store/slices/authSlice';
import { PROPS_TAG } from '../../app/store/types';
import { Card } from '../../components/Card';
import { Likeuser } from '../../components/Likeuser';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  filterlike: any;
}

const FilterLikeData: React.FC<PortfolioProps> = ({ filterlike }) => {
  return (
    <div>
      {filterlike.map((like, i) => (
        <div key={i}>
          <div>
            <Likeuser likeuser={like.likeUser} />
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const res = await fetch(`${apiUrl}api/portfolio`, {
    credentials: 'include',
  });

  const portfolios = await res.json();
  const paths = portfolios.map((a) => {
    return { params: { portfolioid: a.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}api/likefilter/?likePortfolio=${params.portfolioid}`);
  const filterlike = await res.json();
  return {
    props: { filterlike },
    revalidate: 1,
  };
};

export default FilterLikeData;
