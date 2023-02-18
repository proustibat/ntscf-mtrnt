import styles from './NavBar.module.css';

type NavBarProps = {
  className?: string;
};
const NavBar = ({ className }: NavBarProps) => (
  <nav className={[styles.container, className].join(' ')}>NavBar</nav>
);
export default NavBar;
