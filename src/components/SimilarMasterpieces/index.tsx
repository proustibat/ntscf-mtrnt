import styles from './SimilarMasterpieces.module.css';
type SimilarMasterpiecesInformationProps = {
  className?: string;
};
const SimilarMasterpieces = ({
  className,
}: SimilarMasterpiecesInformationProps) => (
  <div className={[styles.container, className].join(' ')}>
    SimilarMasterpieces
  </div>
);
export default SimilarMasterpieces;
