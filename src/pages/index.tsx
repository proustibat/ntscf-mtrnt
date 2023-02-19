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
import jsonPerformance from '../json/data.json';
import { v4 } from 'uuid';
import { Roboto } from '@next/font/google';
import styles from './Home.module.css';

const fontRoboto = Roboto({ weight: '400' });

type HomeProps = {
  trialAd?: TrialAdPropsData;
  masterPieceInformation: MasterpieceInformationPropsData;
  availableVersions?: AvailableVersionsPropsData;
  similarMasterpieces?: SimilarMasterpiecesInformationPropsData;
};
const Home = ({
  trialAd,
  masterPieceInformation,
  availableVersions,
  similarMasterpieces,
}: HomeProps) => {
  return (
    <Layout globalFontClassName={fontRoboto.className}>
      <Head>
        <title>Pachelbel - Canon [Metronaut by Antescofo]</title>
      </Head>

      {trialAd && (
        <TrialAd
          className={[styles.section, styles.trial].join(' ')}
          data={trialAd}
        />
      )}

      <div className={styles.container}>
        <MasterpieceInformation
          className={styles.section}
          data={masterPieceInformation}
        />

        <Player
          className={[styles.section, styles.player].join(' ')}
          title={`${masterPieceInformation.title} by ${masterPieceInformation.composer}`}
        />

        {AvailableVersions && (
          <AvailableVersions
            className={styles.section}
            data={availableVersions as AvailableVersionsPropsData}
          />
        )}

        {SimilarMasterpieces && (
          <SimilarMasterpieces
            className={styles.section}
            data={
              similarMasterpieces as SimilarMasterpiecesInformationPropsData
            }
          />
        )}
      </div>
    </Layout>
  );
};

export default Home;

// This function gets called at build time
export async function getStaticProps() {
  const json = jsonPerformance;
  return {
    props: {
      trialAd: json.trial,
      masterPieceInformation: {
        title: json.title,
        illustration: json.composer_image,
        composer: json.composer,
        description: json.description,
      },
      availableVersions: {
        title: json.versions.title,
        instrument: json.versions.instrument,
        versions: json.versions.data.map((dataVersion) => ({
          ...dataVersion,
          id: v4(),
        })),
      },
      similarMasterpieces: json.similar_pieces.map((item) => ({
        id: v4(),
        title: item.title,
        composer: item.composer,
        illustration: item.composer_image,
      })),
    },
  };
}
