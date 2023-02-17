import { ReactNode } from 'react';
import Head from 'next/head';
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Online score: play classical sheet with Metronaut"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>{children}</main>
    </>
  );
};

export default Layout;
