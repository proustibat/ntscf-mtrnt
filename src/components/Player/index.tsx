import styles from '@/components/Player/Player.module.css';
export type PlayerProps = {
  className?: string;
};
const Player = ({ className }: PlayerProps) => (
  <div className={[styles.container, className].join(' ')}>Player</div>
);
export default Player;
