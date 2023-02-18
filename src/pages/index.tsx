import Head from 'next/head';
import Layout from '@/components/Layout';
import TrialAd, { TrialAdPropsData } from '@/components/TrialAd';
import MasterpieceInformation, {
  MasterpieceInformationPropsData,
} from '@/components/MasterpieceInformation';
import AvailableVersions, {
  AvailableVersionsPropsData,
} from '@/components/AvailableVersions';
import Player from '@/components/Player';
import SimilarMasterpieces, {
  SimilarMasterpiecesInformationPropsData,
} from '@/components/SimilarMasterpieces';

import styles from './Home.module.css';

const json = {
  title: 'Canon',
  composer_image: 'PachelbelIcon.svg',
  composer: 'Pachelbel',
  description:
    "Definitely an All-Time-Greatest Hit! Always a pleasure to listen to.\nThe melody evolves and becomes gradually more complex: ideal to improve your fingers' flexibility and accuracy!\nLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  trial: {
    title: 'Try 7 days for free',
    description:
      "Ceci est un extrait de la partition. Commence vote essai gratuit pour obtenir la version complète et bien d'autres fonctionnalités !",
    cta: 'Essayer gratuitement',
  },
  versions: {
    title: 'Available versions',
    instrument: 'Violon',
    data: [
      {
        title: 'Intermediate with orchestra',
        description: 'Composed for Violin',
        current: true,
      },
      {
        title: 'Intermediate with Piano',
        description: 'Composed for Violin',
        current: false,
      },
      {
        title: 'Easy with Piano',
        description: 'Composed for Violin',
        current: false,
      },
    ],
  },
  similar_pieces: [
    {
      title: 'Douce Nuit (instrumental)',
      composer: 'Ludwig van Beethoven',
      composer_image: 'BeethovenIcon.svg',
    },
    {
      title: 'Douce Nuit (instrumental) Suite du titre ici',
      composer: 'Ludwig van Beethoven',
      composer_image: 'ElgarIcon.svg',
    },
    {
      title: 'Sonata Pathétique in C minor Op. 13 - 2. Adagio cantabile',
      composer: 'Ludwig van Beethoven',
      composer_image: 'ElgarIcon.svg',
    },
    {
      title: 'Douce Nuit (instrumental)',
      composer: 'Ludwig van Beethoven',
      composer_image: 'BeethovenIcon.svg',
    },
  ],
};

enum DATA_TYPE {
  TRIAL = 'trial',
  INFORMATION = 'information',
  VERSIONS = 'versions',
  SIMILAR = 'similar',
}

const getData: (dataType: DATA_TYPE) => unknown = (dataType) => {
  const mapping = {
    [DATA_TYPE.TRIAL]: json.trial,
    [DATA_TYPE.INFORMATION]: {
      title: json.title,
      illustration: json.composer_image,
      composer: json.composer,
      description: json.description,
    },
    [DATA_TYPE.VERSIONS]: {
      title: json.versions.title,
      instrument: json.versions.instrument,
      versions: json.versions.data,
    },
    [DATA_TYPE.SIMILAR]: json.similar_pieces.map((item) => ({
      title: item.title,
      composer: item.composer,
      illustration: item.composer_image,
    })),
  };
  return mapping[dataType];
};

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Pachelbel - Canon [Metronaut by Antescofo]</title>
      </Head>
      <TrialAd
        className={[styles.section, styles.trial].join(' ')}
        data={getData(DATA_TYPE.TRIAL) as TrialAdPropsData}
      />
      <div className={styles.container}>
        <aside className={[styles.aside].join(' ')}>
          <MasterpieceInformation
            className={styles.section}
            data={
              getData(DATA_TYPE.INFORMATION) as MasterpieceInformationPropsData
            }
          />
          <AvailableVersions
            className={styles.section}
            data={getData(DATA_TYPE.VERSIONS) as AvailableVersionsPropsData}
          />
          <SimilarMasterpieces
            className={styles.section}
            data={
              getData(
                DATA_TYPE.SIMILAR
              ) as SimilarMasterpiecesInformationPropsData
            }
          />
        </aside>

        <Player className={[styles.section, styles.player].join(' ')} />
      </div>
    </Layout>
  );
}
