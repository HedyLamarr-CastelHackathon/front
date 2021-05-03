import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from 'styles/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <FontAwesomeIcon icon={['fab', 'github']} />
    <a href="https://github.com/HedyLamarr-CastelHackathon" target="_blank" rel="noopener noreferrer">
      GitHub
    </a>
  </footer>
);

export default Footer;
