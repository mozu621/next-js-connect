import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper, makeStore } from '../app/store';

import { Layout } from '../components/Layout';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
