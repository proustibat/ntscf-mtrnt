import Select, { MultiValue, PropsValue, SingleValue } from 'react-select';
import styles from './AvailableVersions.module.css';

export type AvailableVersionsPropsData = {
  title: string;
  instrument: string;
  versions: {
    id: string;
    title: string;
    description: string;
    current: boolean;
  }[];
};

export type AvailableVersionsProps = {
  className?: string;
  data: AvailableVersionsPropsData;
};

type VersionOptions = { label: string; value: string; current: boolean };

const AvailableVersions = ({
  className,
  data: { title, instrument, versions },
}: AvailableVersionsProps) => {
  const options: PropsValue<SingleValue<VersionOptions>>[] = versions.map(
    (v) => ({
      label: v.title,
      value: v.title,
      current: v.current,
    })
  );

  const handleChange = (
    option: SingleValue<
      | VersionOptions
      | MultiValue<SingleValue<VersionOptions>>
      | null
      | undefined
    >
  ) => {
    alert(
      // TODO: have a look on the documentation of react-select to fix this TS error
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      `TODO: go to ${option?.label} when backend will provide url in json for each link`
    );
  };
  return (
    <section className={[styles.container, className].join(' ')}>
      <h2 className={styles.title}>{title}</h2>
      <p>{instrument}</p>
      {versions.length && (
        <Select
          className={styles.select}
          options={options}
          onChange={handleChange}
          defaultValue={options.find(
            // TODO: have a look on the documentation of react-select to fix this TS error
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            (option: VersionOptions) => option.current
          )}
        />
      )}
    </section>
  );
};
export default AvailableVersions;
