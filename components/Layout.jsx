import styles from 'styles/Layout.module.css';
import Footer from './Footer';

const Layout = ({ children }) => (
  <div className={styles.container}>
    <main className={styles.main}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
