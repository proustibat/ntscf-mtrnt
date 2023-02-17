import styles from './AvailableVersions.module.css';
type AvailableVersionsProps = {
  className?: string;
};

const AvailableVersions = ({ className }: AvailableVersionsProps) => (
  <section className={[styles.container, className].join(' ')}>
    AvailableVersions
  </section>
);
export default AvailableVersions;
