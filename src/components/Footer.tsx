import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectProfile } from '../app/store/slices/authSlice';
import { Avatar } from './Avatar';

const Footer: React.FC = () => {
  return (
    <>
      <footer className='text-gray-600 '>
        <div className='container flex flex-col items-center py-8 px-5 mx-auto sm:flex-row'>
          <a className='flex justify-center items-center font-medium text-gray-900 md:justify-start '>
            <span className='ml-3 text-xl'>Connect</span>
          </a>
          <p className='mt-4 text-sm text-gray-500 sm:py-2 sm:pl-4 sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-200'>
            © 2022mozu
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
