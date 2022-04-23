import console from 'console';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';

import { fetchAsyncGetProfs } from '../../app/store/slices/authSlice';
import { Params, PROPS_PROFILE } from '../../app/store/types';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface ProfileProps {
  profile: PROPS_PROFILE;
}

const ProfileData: React.FC<ProfileProps> = ({ profile }) => {
  return <div>{profile.nickName}</div>;
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const res = await fetch(`${apiUrl}api/profile`, {
    credentials: 'include',
  });

  const profiles = await res.json();

  const paths = profiles.map((a) => {
    return { params: { id: a.id.toString() } };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`${apiUrl}api/profile/${params.id}`);
  const profile = await res.json();

  return {
    props: { profile },
    revalidate: 1,
  };
};

export default ProfileData;
