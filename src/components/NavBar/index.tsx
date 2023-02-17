import styles from './NavBar.module.css';

type NavBarProps = {
  className?: string;
};
const NavBar = ({ className }: NavBarProps) => (
  <div className={[styles.container, className].join(' ')}>NavBar</div>
);
export default NavBar;
