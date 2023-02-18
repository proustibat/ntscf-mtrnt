import styles from './SimilarMasterpieces.module.css';

export type SimilarMasterpiecesInformationPropsData = {
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
    <h2>Similar Masterpieces</h2>
    {data.length && (
      <ul>
        {data.map((item) => (
          <li key={item.title}>
            <p>
              {item.title}
              <br />
              {item.illustration}
              <br />
              {item.composer}
            </p>
          </li>
        ))}
      </ul>
    )}
  </div>
);
export default SimilarMasterpieces;
