import Image from 'next/image';

export const Avatar: React.FC = () => (
  <div className='flex justify-center mt-10'>
    <div className='flex relative justify-center items-center m-1 mr-2 w-16 h-16 text-xl text-white rounded-full'>
      <Image className='rounded-full' alt='A' src='/top.png' height={144} width={144} />
    </div>
  </div>
);
