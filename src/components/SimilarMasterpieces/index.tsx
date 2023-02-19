import Image from 'next/image';
import styles from '@/components/SimilarMasterpieces/SimilarMasterpieces.module.css';

export type SimilarMasterpiecesInformationPropsData = {
  id: string;
  title: string;
  composer: string;
  illustration: string;
}[];

export type SimilarMasterpiecesInformationProps = {
  className?: string;
  data: SimilarMasterpiecesInformationPropsData;
};

const SimilarMasterpieces = ({
  className,
  data,
}: SimilarMasterpiecesInformationProps) => (
  <div className={[styles.container, className].join(' ')}>
    <h2 className={styles.containerTitle}>Similar Masterpieces</h2>
    {data.length &&
      data.map((item) => (
        <article className={styles.article} key={item.id}>
          <Image
            src={item.illustration}
            height={40}
            width={40}
            alt={`${item.title} illustration`}
            className={styles.illustration}
          />
          <p className={styles.textBlock}>
            <span className={styles.title}>{item.title}</span>
            <span className={styles.composer}>{item.composer}</span>
          </p>
        </article>
      ))}
  </div>
);
export default SimilarMasterpieces;
