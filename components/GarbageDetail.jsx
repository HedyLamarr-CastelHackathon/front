/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { post } from 'lib/api';
import styles from 'styles/GarbageDetail.module.scss';
import { useOverlayContent } from 'contexts/overlay-context';
import Popup from 'components/Popup';

const GarbageDetail = ({ garbage }) => {
  const initialForm = { isHere: true, isDamaged: false, isFull: false };
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const { dispatch } = useOverlayContent();

  const isFormEmpty = () => JSON.stringify(form) === JSON.stringify(initialForm);

  const sendReport = async (event) => {
    setTouched(true);
    event.preventDefault();
    if (isFormEmpty()) {
      return;
    }
    try {
      setLoading(true);
      await post('/reports', { ...form, garbage: garbage.id });
      setLoading(false);
      dispatch({ type: 'hide' });
      dispatch({ type: 'show', payload: { component: Popup, props: { text: 'Merci !', description: 'Votre demande a été prise en compte.' } } });
    } catch (error) {}
  };

  const onClick = (event) => {
    event.stopPropagation();
  };

  const onCancel = () => {
    dispatch({ type: 'hide' });
  };

  const toggle = (key) => () => {
    setTouched(true);
    const newForm = { ...form };
    newForm[key] = !newForm[key];
    setForm(newForm);
  };

  return (
    <section className={styles.detail} onClick={onClick}>
      <h1 className={styles.title}>Signaler un problème</h1>
      <p className={styles.description}>Rendons notre ville plus propre ensemble !</p>
      {touched && isFormEmpty() ? <p className={styles.description}>Choisissez le problème observé sur la poubelle.</p> : ' '}
      <form className={styles.form}>
        <button type="button" className={`${styles.button} ${!form.isHere ? styles.checked : null}`} onClick={toggle('isHere')}>
          La poubelle n'est plus là
        </button>
        <button type="button" className={`${styles.button} ${form.isDamaged ? styles.checked : null}`} onClick={toggle('isDamaged')}>
          La poubelle est abîmée
        </button>
        <button type="button" className={`${styles.button} ${form.isFull ? styles.checked : null}`} onClick={toggle('isFull')}>
          La poubelle est trop pleine
        </button>
        <div className={styles.bottom}>
          <button type="submit" className={`${styles.button} ${styles.submit}`} onClick={sendReport}>
            {loading ? 'Envoi...' : 'Signaler les problèmes'}
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
