import Image from 'next/image';
import styles from './MasterpieceInformation.module.css';
import Description from '@/components/MasterpieceInformation/Description';

export type MasterpieceInformationPropsData = {
  title: string;
  illustration: string;
  composer: string;
  description: string;
};

export type MasterpieceInformationProps = {
  className?: string;
  data: MasterpieceInformationPropsData;
};

const MasterpieceInformation = ({
  className,
  data: { title, illustration, composer, description },
}: MasterpieceInformationProps) => (
  <article className={[styles.container, className].join(' ')}>
    <h2 className={styles.title}>
      <Image
        src={illustration}
        height={32}
        width={32}
        alt="Pachelbel illustration"
        className={styles.illustration}
      />
      <span className={styles.masterpiece}>{title}</span>
      <span className={styles.middot}>&nbsp;&middot;&nbsp;</span>
      <span className={styles.composer}>{composer}</span>
    </h2>
    <Description text={description} />
  </article>
);
export default MasterpieceInformation;
