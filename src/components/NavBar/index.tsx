import styles from '@/components/NavBar/Navbar.module.css';

type NavBarProps = {
  className?: string;
};
const NavBar = ({ className }: NavBarProps) => (
  <nav className={[styles.container, className].join(' ')}>NavBar</nav>
);
export default NavBar;
