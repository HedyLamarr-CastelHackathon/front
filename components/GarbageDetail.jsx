/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { post } from 'lib/api';
import styles from 'styles/GarbageDetail.module.scss';
import { useOverlayContent } from 'contexts/overlay-context';

const GarbageDetail = ({ garbage }) => {
  const sendReport = () => {};

  const onClick = (event) => {
    event.stopPropagation();
  };

  const { dispatch } = useOverlayContent();

  const onCancel = () => {
    dispatch({ type: 'hide' });
  };

  return (
    <section className={styles.detail} onClick={onClick}>
      <h1 className={styles.title}>Signaler un problème</h1>
      <p className={styles.description}>Rendons notre ville plus propre ensemble !</p>
      <form className={styles.form}>
        <button type="button" className={styles.button} onClick={() => sendReport()}>
          La poubelle n'est plus là
        </button>
        <button type="button" className={styles.button} onClick={sendReport}>
          La poubelle est abîmée
        </button>
        <button type="button" className={styles.button} onClick={sendReport}>
          La poubelle est trop pleine
        </button>
        <div className={styles.bottom}>
          <button type="submit" className={`${styles.button} ${styles.submit}`} onClick={sendReport}>
            Signaler les problèmes
          </button>
          <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancel}`}>
            Annuler
          </button>
        </div>
      </form>
    </section>
  );
};

export default GarbageDetail;
