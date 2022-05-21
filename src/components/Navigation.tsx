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
                <Link href='/'>
                  <a className='text-2xl font-bold text-red-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors duration-200 lg:text-3xl'>
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
                <a
                  href='#'
                  className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'
                >
                  お気に入り
                </a>
                <a
                  href='#'
                  className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'
                >
                  人気
                </a>
                <div className='py-1 px-2 mx-2 mt-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition-colors duration-200 md:mt-0'>
                  <Link href='/'>ホーム</Link>
                </div>
              </div>

              <div className='flex items-center mt-4 md:mt-0'>
                {/* ↓ベル */}
                <button
                  className='hidden mx-4 text-red-600 hover:text-gray-700 focus:text-gray-700 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400 focus:outline-none transition-colors duration-200 md:block'
                  aria-label='show notifications'
                >
                  <svg
                    className='w-6 h-6'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>

                <button
                  type='button'
                  className='flex items-center focus:outline-none'
                  aria-label='toggle profile dropdown'
                >
                  {/* ↓avatar周り */}

                  {myprofile.img && <Avatar imgurl={myprofile.img} profileid={myprofile.id} />}

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
