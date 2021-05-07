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
    from: { position: 'absolute', top: '100%' },
    enter: { top: '0%' },
    leave: { top: '100%' },
  });

  const onClick = () => {
    dispatch({ type: 'hide' });
  };

  return (
    <>
      <Dimmer visible={state.length > 0} />
      {transitions((props, { component: Component, key, props: componentProps }) => (
        <animated.section key={key} style={props} className={styles.section} onClick={onClick}>
          <Component {...componentProps} />
        </animated.section>
      ))}
    </>
  );
};

export default Overlay;
