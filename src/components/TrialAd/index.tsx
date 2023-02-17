import styles from './TrialAd.module.css';
type TrialAdProps = {
  className?: string;
};
const TrialAd = ({ className }: TrialAdProps) => (
  <section className={[styles.container, className].join(' ')}>TrialAd</section>
);
export default TrialAd;
