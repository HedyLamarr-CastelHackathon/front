/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import styles from 'styles/GarbageDetail.module.scss';
import { useOverlayContent } from 'contexts/overlay-context';

const Popup = ({ text, description }) => {
  const { dispatch } = useOverlayContent();

  const onClick = (event) => {
    event.stopPropagation();
  };

  const onAccept = () => {
    dispatch({ type: 'hide' });
  };

  return (
    <section className={styles.detail} onClick={onClick}>
      <h1 className={styles.title}>{text}</h1>
      <p className={styles.description}>{description}</p>
      <button type="submit" className={`${styles.button} ${styles.submit}`} onClick={onAccept}>
        Retour
      </button>
    </section>
  );
};

export default Popup;
