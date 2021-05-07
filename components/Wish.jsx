/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { post } from 'lib/api';
import styles from 'styles/GarbageDetail.module.scss';
import { useOverlayContent } from 'contexts/overlay-context';
import Popup from 'components/Popup';

const Wish = ({ position }) => {
  const { dispatch } = useOverlayContent();
  const [loading, setLoading] = useState(false);

  const onClick = (event) => {
    event.stopPropagation();
  };

  const onCancel = () => {
    dispatch({ type: 'hide' });
  };

  const sendWish = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await post('/reports', { position });
      setLoading(false);
      dispatch({ type: 'hide' });
      dispatch({ type: 'show', payload: { component: Popup, props: { text: 'Merci !', description: 'Votre demande a été prise en compte.' } } });
    } catch (error) {}
  };

  const isPositionValid = () => position[0] !== null && position[1] !== null;

  return (
    <section className={styles.detail} onClick={onClick}>
      <h1 className={styles.title}>Demander une poubelle dans votre quartier</h1>
      <p className={styles.description}>
        {isPositionValid()
          ? 'En cliquant sur Envoyer, la commune utilisera votre position comme suggestion pour installer une nouvelle poubelle.'
          : "Veuillez activer la géolocalisation pour faire une demande d'installation de poubelle chez vous"}
      </p>
      <div className={styles.bottom}>
        {isPositionValid() ? (
          <button type="submit" className={`${styles.button} ${styles.submit}`} onClick={sendWish}>
            {loading ? 'Envoi...' : 'Envoyer'}
          </button>
        ) : null}
        <button type="button" onClick={onCancel} className={`${styles.button} ${styles.cancel}`}>
          Annuler
        </button>
      </div>
    </section>
  );
};

export default Wish;
