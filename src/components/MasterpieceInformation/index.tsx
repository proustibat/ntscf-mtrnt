import styles from './MasterpieceInformation.module.css';
type MasterpieceInformationProps = {
  className?: string;
};
const MasterpieceInformation = ({ className }: MasterpieceInformationProps) => (
  <section className={[styles.container, className].join(' ')}>
    MasterpieceInformation
  </section>
);
export default MasterpieceInformation;
