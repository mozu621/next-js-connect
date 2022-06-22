import { request } from 'https';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiFillGithub, AiOutlineTwitter } from 'react-icons/ai';

import { useSelector } from 'react-redux';
import { fetchAsyncGetProfs, selectProfile } from '../../app/store/slices/authSlice';
import { Params, PROPS_PROFILE } from '../../app/store/types';

const apiUrl = process.env.NEXT_PUBLIC_API_ENDOPOINT;

interface ProfileProps {
  profile: PROPS_PROFILE;
}

const ProfileData: React.FC<ProfileProps> = ({ profile }) => {
  const myprofile = useSelector(selectProfile);
  return (
    <div>
      <div className='flex flex-col items-center pt-4 pb-10 sm:whitespace-normal md:mx-32 lg:mx-48'>
        {profile.id == myprofile.id && (
          <Link href='/editprofile' passHref>
            <button className='py-2 px-4 mb-5 ml-auto font-semibold text-gray-800 bg-white hover:bg-gray-100 rounded-full border border-gray-400 shadow'>
              編集
            </button>
          </Link>
        )}
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
        <p className='mb-4 text-lg leading-relaxed '>{profile.introduction}</p>
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
