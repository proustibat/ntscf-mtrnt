import { useState } from 'react';
import styles from './Description.module.css';

export type DescriptionProps = {
  text: string;
};

const Description = ({ text }: DescriptionProps) => {
  const [hasEllipsis, setHasEllipsis] = useState(true);
  const handleSeeMoreClick = () => {
    setHasEllipsis(!hasEllipsis);
  };
  return (
    <>
      <p
        className={(hasEllipsis
          ? [styles.description, styles.hasEllipsis]
          : [styles.description]
        ).join(' ')}
      >
        {text}
      </p>
      <button className={styles.seeMore} onClick={handleSeeMoreClick}>
        {hasEllipsis ? 'See more' : 'See less'}
      </button>
    </>
  );
};

export default Description;
