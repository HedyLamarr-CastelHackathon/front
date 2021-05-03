import Footer from './Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
