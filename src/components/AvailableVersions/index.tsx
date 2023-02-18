import styles from './AvailableVersions.module.css';

export type AvailableVersionsPropsData = {
  title: string;
  instrument: string;
  versions: {
    title: string;
    description: string;
    current: boolean;
  }[];
};

export type AvailableVersionsProps = {
  className?: string;
  data: AvailableVersionsPropsData;
};

const AvailableVersions = ({
  className,
  data: { title, instrument, versions },
}: AvailableVersionsProps) => (
  <section className={[styles.container, className].join(' ')}>
    <h2>{title}</h2>
    {/*TODO: use Link component*/}
    <p>{instrument}</p>
    {versions.length && (
      <ul>
        {versions.map((version) => (
          <li key={title}>
            {/*TODO: use a select, add an interaction to create a link and add current state*/}
            <p>
              {version.title}
              <br />
              {version.description}
            </p>
          </li>
        ))}
      </ul>
    )}
  </section>
);
export default AvailableVersions;
