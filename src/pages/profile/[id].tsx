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
  return (
    <div>
      <div className='flex justify-end px-4 pt-4'>
        <div
          id='dropdown'
          className='hidden z-10 w-44 text-base list-none bg-white dark:bg-gray-700 rounded divide-y divide-gray-100 shadow'
        ></div>
      </div>
      <div className='flex flex-col items-center pb-10'>
        <img className='mb-3 w-24 h-24 rounded-full shadow-lg' src={profile.img} />
        <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
          {profile.nickName}
        </h5>
        <span className='text-sm text-gray-500 dark:text-gray-400'>Visual Designer</span>
        <div className='flex mt-4 space-x-3 lg:mt-6'>
          <a
            href='#'
            className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800'
          >
            Add friend
          </a>
          <a
            href='#'
            className='inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 dark:text-white bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 dark:hover:border-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700'
          >
            Message
          </a>
        </div>
      </div>
    </div>
  );
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
