import 'tailwindcss/tailwind.css';
import type { AppProps } from 'next/app';
import { wrapper } from '../app/store';
import { Layout } from '../components/Layout';

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
