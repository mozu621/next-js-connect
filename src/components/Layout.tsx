import { ReactElement } from 'react';
import Navigation from './Navigation';

type LayoutProps = Required<{
  readonly children: ReactElement;
}>;

export const Layout = (props: LayoutProps) => {
  return (
    <>
      <div>
        <Navigation />
        <div className='py-6 px-8 mx-auto max-w-7xl '>{props.children}</div>
      </div>
    </>
  );
};
