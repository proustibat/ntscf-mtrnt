import styles from './Player.module.css';
type PlayerProps = {
  className?: string;
};
const Player = ({ className }: PlayerProps) => (
  <div className={[styles.container, className].join(' ')}>Player</div>
);
export default Player;
