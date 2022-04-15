import Image from 'next/image';
import gjak from '../public/gjak.jpg';

const about: React.FC = () => {
  return (
    <div>
      <Image src={gjak} alt='' />
      gakjgla
    </div>
  );
};

export default about;
