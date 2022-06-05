import console from 'console';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { fetchAsyncGetProfs } from '../../app/store/slices/authSlice';
import { PROPS_TAG } from '../../app/store/types';
import { Card } from '../../components/Card';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface PortfolioProps {
  filterportfolio: any;
}

const FilterPortfolioData: React.FC<PortfolioProps> = ({ filterportfolio }) => {
  return (
    <div>
      {filterportfolio.map((portfolio, i) => (
        <div key={i}>
          <div>
            <Card
              title={portfolio.tagPortfolio.title}
              portfolioid={portfolio.tagPortfolio.id}
              author={portfolio.tagPortfolio.author}
              portfolioimg={portfolio.tagPortfolio.img}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ tagname: string }> = async () => {
  const res = await fetch(`${apiUrl}api/tag`, {
    credentials: 'include',
  });

  const tags = await res.json();

  const paths = tags.map((a) => {
    return { params: { tagname: a.tagname.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}api/tagfilter/?tagname=${params.tagname}`);
  const filterportfolio = await res.json();
  return {
    props: { filterportfolio },
    revalidate: 1,
  };
};

export default FilterPortfolioData;
