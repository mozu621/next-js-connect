import console from 'console';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';

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
        <img className='mb-5 w-36 h-36 rounded-full shadow-lg' src={profile.img} />
        <h5 className='mb-1 text-2xl font-medium text-gray-900 dark:text-white'>
          {profile.nickName}
        </h5>

        <div className='flex space-x-3'>
          <a
            href={profile.githuburl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center py-2 px-4 text-2xl'
          >
            <AiFillGithub />
          </a>
          <a
            href={profile.twitterurl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center py-2 px-4 text-2xl'
          >
            <AiOutlineTwitter />
          </a>
        </div>
        <span className='text-sm text-gray-500 dark:text-gray-400'>Visual Designer</span>
        <p className='mb-4 text-lg leading-relaxed sm:whitespace-normal md:mx-32 lg:mx-48'>
          {profile.introduction}
        </p>
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
