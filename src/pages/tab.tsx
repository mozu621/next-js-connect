import React from 'react';
import { useEffect, useState } from 'react';

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
  const [inputValue, setInputValue] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChange3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue2(e.target.value);
  };
  return (
    <>
      <div className='flex flex-wrap'>
        <div className='w-full'>
          <ul className='flex flex-row flex-wrap pt-3 pb-4 mb-0 list-none' role='tablist'>
            <li className='flex-auto mr-2 last:mr-0 -mb-px text-center'>
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 1 ? 'text-black bg-blue-600' : 'text-blueGray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle='tab'
                href='#link1'
                role='tablist'
              >
                Textsearch
              </a>
            </li>
            <li className='flex-auto mr-2 last:mr-0 -mb-px text-center'>
              <a
                className={
                  'text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal ' +
                  (openTab === 2 ? 'text-black bg-blue-600' : 'text-blueGray-600 bg-white')
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle='tab'
                href='#link2'
                role='tablist'
              >
                Tabsearch
              </a>
            </li>
          </ul>
          <div className='flex relative flex-col mb-6 w-full min-w-0 break-words bg-white rounded shadow-lg'>
            <div className='flex-auto py-5 px-4'>
              <div className='tab-content tab-space'>
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleChange2}
                    className='py-3 pr-4 pl-10 w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md border focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring'
                    placeholder='タイトルで検索'
                  />
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                  <input
                    type='text'
                    value={inputValue}
                    onChange={handleChange3}
                    className='py-3 pr-4 pl-10 w-full text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-md border focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring'
                    placeholder='tabで検索'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;
