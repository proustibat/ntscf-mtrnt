import Head from 'next/head';
import Layout from '@/components/Layout';
import TrialAd from '@/components/TrialAd';
import MasterpieceInformation from '@/components/MasterpieceInformation';
import AvailableVersions from '@/components/AvailableVersions';
import Player from '@/components/Player';
import SimilarMasterpieces from '@/components/SimilarMasterpieces';

import styles from './Home.module.css';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pachelbel - Canon [Metronaut by Antescofo]</title>
      </Head>
      <TrialAd className={[styles.section, styles.trial].join(' ')} />
      <div className={styles.container}>
        <aside className={[styles.aside].join(' ')}>
          <MasterpieceInformation className={styles.section} />
          <AvailableVersions className={styles.section} />
          <SimilarMasterpieces className={styles.section} />
        </aside>
        <Player className={[styles.section, styles.player].join(' ')} />
      </div>
    </Layout>
  );
}
