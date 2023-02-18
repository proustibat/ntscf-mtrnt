import styles from './MasterpieceInformation.module.css';

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
  <section className={[styles.container, className].join(' ')}>
    <h2>{title}</h2>
    {/*TODO: use image component*/}
    <h3>
      {illustration} {composer}
    </h3>
    <p>{description}</p>
  </section>
);
export default MasterpieceInformation;
