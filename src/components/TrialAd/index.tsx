import styles from './TrialAd.module.css';

export type TrialAdPropsData = {
  title: string;
  description: string;
  cta: string;
};
export type TrialAdProps = {
  className?: string;
  data: TrialAdPropsData;
};

const TrialAd = ({
  className,
  data: { title, description, cta },
}: TrialAdProps) => (
  <section className={[styles.container, className].join(' ')}>
    <div>
      <h2 className={styles.title}>{title}</h2>
      <p>{description}</p>
    </div>
    <div>
      <button className={styles.button}>{cta}</button>
    </div>
  </section>
);
export default TrialAd;
