import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectProfile } from '../app/store/slices/authSlice';
import { Avatar } from './Avatar';

const Navigation: React.FC = () => {
  const myprofile = useSelector(selectProfile);

  return (
    <>
      <nav className='bg-white dark:bg-gray-800 shadow'>
        <div className='container py-4 px-6 mx-auto'>
          <div className='md:flex md:justify-between md:items-center'>
            <div className='flex justify-between items-center'>
              <div className='text-xl font-semibold text-gray-700'>
                <Link href='/core'>
                  <a className=' font-mono marker:text-2xl font-bold text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-200 lg:text-5xl'>
                    Connect
                  </a>
                </Link>
              </div>

              <div className='flex md:hidden'>
                <button
                  type='button'
                  className='text-gray-500 hover:text-gray-600 focus:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 focus:outline-none'
                  aria-label='toggle menu'
                >
                  <svg viewBox='0 0 24 24' className='w-6 h-6 fill-current'></svg>
                </button>
              </div>
            </div>

            <div className='items-center md:flex'>
              <div className='flex flex-col -mx-4 md:flex-row md:items-center md:mx-8'>
                <div className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'>
                  <Link href={`/likeportfolio/${myprofile.profileUser}`}>お気に入り</Link>
                </div>
                <div className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'>
                  <Link href='/popular'>人気</Link>
                </div>
                <div className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'>
                  <Link href='/newportfolio'>ポートフォリオ登録</Link>
                </div>
              </div>

              <div className='flex items-center mt-4 md:mt-0'>
                <button
                  type='button'
                  className='flex items-center focus:outline-none'
                  aria-label='toggle profile dropdown'
                >
                  {/* ↓avatar周り */}

                  <Avatar imgurl={myprofile.img} profileid={myprofile.id} />

                  <h3 className='mx-2 text-sm font-medium text-gray-700 dark:text-gray-200 md:hidden'>
                    Khatab wedaa
                  </h3>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
