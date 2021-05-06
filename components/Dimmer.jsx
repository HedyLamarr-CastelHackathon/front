import styles from 'styles/Dimmer.module.css';

const Dimmer = ({ visible = false }) => {
  const style = { opacity: visible ? '50%' : '0%', pointerEvents: visible ? 'auto' : 'none' };

  return <div className={styles.dimmer} style={style} />;
};

export default Dimmer;
