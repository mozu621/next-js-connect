import React from 'react';

const Tabs = () => {
  const [openTab, setOpenTab] = React.useState(1);
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
                Profile
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
                Settings
              </a>
            </li>
          </ul>
          <div className='flex relative flex-col mb-6 w-full min-w-0 break-words bg-white rounded shadow-lg'>
            <div className='flex-auto py-5 px-4'>
              <div className='tab-content tab-space'>
                <div className={openTab === 1 ? 'block' : 'hidden'} id='link1'>
                  <p>
                    Collaboratively administrate empowered markets via plug-and-play networks.
                    Dynamically procrastinate B2C users after installed base benefits.
                    <br />
                    <br /> Dramatically visualize customer directed convergence without
                    revolutionary ROI.
                  </p>
                </div>
                <div className={openTab === 2 ? 'block' : 'hidden'} id='link2'>
                  <p>
                    Completely synergize resource taxing relationships via premier niche markets.
                    Professionally cultivate one-to-one customer service with robust ideas.
                    <br />
                    <br />
                    Dynamically innovate resource-leveling customer service for state of the art
                    customer service.
                  </p>
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
