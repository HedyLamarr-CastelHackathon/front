/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { useTransition, animated } from 'react-spring';
import styles from 'styles/Overlay.module.css';
import Dimmer from './Dimmer';
import { useOverlayContent } from '../contexts/overlay-context';

const Overlay = () => {
  const { state, dispatch } = useOverlayContent();

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.keyCode === 27) {
        dispatch({ type: 'hide' });
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  const transitions = useTransition(state, {
    from: { position: 'absolute', bottom: '-100%' },
    enter: { bottom: '0%' },
    leave: { bottom: '-100%' },
  });

  return (
    <>
      <Dimmer visible={state.length > 0} />
      {transitions((props, { component: Component, key, props: componentProps }) => (
        <animated.section key={key} style={props} className={styles.section}>
          <Component {...componentProps} />
        </animated.section>
      ))}
    </>
  );
};

export default Overlay;
