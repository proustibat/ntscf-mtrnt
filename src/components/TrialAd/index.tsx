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
    <h2>{title}</h2>
    <p>{description}</p>
    {/*todo: use Link component?*/}
    <button>{cta}</button>
  </section>
);
export default TrialAd;
