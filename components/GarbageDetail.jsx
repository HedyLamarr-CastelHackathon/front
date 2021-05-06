import styles from 'styles/GarbageDetail.module.css';

const GarbageDetail = ({ garbage }) => (
  <section className={styles.detail}>
    <h1>Garbage Detail</h1>
    <p>Address</p>
    <h2>Report a problem</h2>
    <div className={styles.buttons}>
      <button type="button" className={styles.button}>
        Missing garbage bin
      </button>
      <button type="button" className={styles.button}>
        Damaged garbage bin
      </button>
      <button type="button" className={styles.button}>
        Garbage bin is full
      </button>
    </div>
  </section>
);

export default GarbageDetail;
