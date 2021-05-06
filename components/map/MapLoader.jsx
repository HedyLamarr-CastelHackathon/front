import styles from 'styles/MapLoader.module.css';
import Trash from 'components/Trash';

const Loader = () => (
  <section className={styles.container}>
    <Trash className={styles.loader} />
  </section>
);

export default Loader;
