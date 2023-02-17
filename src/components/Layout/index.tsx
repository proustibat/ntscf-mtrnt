import { ReactNode } from 'react';
import Head from 'next/head';
import NavBar from '@/components/NavBar';
import styles from './Layout.module.css';
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
      <NavBar className={styles.navbar} />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
