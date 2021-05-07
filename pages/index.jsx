/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';
import { get } from 'lib/api';

import Head from 'next/head';
import Map from 'components/map';
import styles from 'styles/Home.module.scss';
import FilterCheckbox from 'components/FilterCheckbox';
import { useOverlayContent } from 'contexts/overlay-context';
import Wish from 'components/Wish';

const LOC_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const Home = () => {
  const [position, setPosition] = useState([null, null]);
  const [garbageList, setGarbageList] = useState(null);
  const [garbageTypes, setGarbageTypes] = useState([
    { color: '#111111', code: 'C1', checked: true },
    { color: '#ECF10E', code: 'C2', checked: true },
    { color: '#2AE51A', code: 'C3', checked: false },
  ]);
  const { dispatch } = useOverlayContent();

  const stringToArray = (string) =>
    string
      .substring(1, string.length - 1)
      .split(',')
      .map(parseFloat);

  const getGarbageGeo = (garbage) => ({ ...garbage, geo: { ...garbage.geo, localisation: stringToArray(garbage.geo.localisation) } });

  const triggerGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        // eslint-disable-next-line no-use-before-define
        geolocate,
        () => {
          console.log('Sorry, no position available.');
        },
        LOC_OPTIONS
      );
    } else {
      console.log('geolocation not disponible');
    }
  };

  // eslint-disable-next-line consistent-return
  useEffect(async () => {
    triggerGeolocation();
    try {
      const res = await get('/garbages');
      const newGarbageList = res['hydra:member'].map(getGarbageGeo);
      setGarbageList(newGarbageList);
    } catch (error) {
      setGarbageList([]);
    }
  }, []);

  const geolocate = useCallback((pos) => {
    setPosition([pos.coords.latitude, pos.coords.longitude]);
  });

  const onClickWish = () => {
    dispatch({ type: 'show', payload: { component: Wish, props: { position } } });
  };

  return (
    <>
      <Head>
        <title>Hedy Lamarr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.search}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="search" hidden>
            Mon adresse...
          </label>
          <input type="search" id="search" name="q" list="search-datalist" placeholder="Recherche" />
          <datalist id="search-datalist">
            <option value="se localiser" />
            <option value="200 rue Machin" />
          </datalist>
        </div>
        <button type="button" className={styles.btn} onClick={() => triggerGeolocation()}>
          Se localiser
        </button>
        <div className={styles.nav}>
          <div className={styles['filter-container']}>
            <p>Filtrer : </p>
            {garbageTypes.map((type, i) => (
              <FilterCheckbox key={i} index={i} types={garbageTypes} setTypes={setGarbageTypes} />
            ))}
          </div>
          <div className={styles['action-container']}>
            <button type="button" className={styles.btn} onClick={() => onClickWish()}>
              Demande
            </button>
          </div>
        </div>
      </header>

      <div className={styles.map}>
        <Map garbageList={garbageList} position={position} garbageTypes={garbageTypes} />
      </div>
    </>
  );
};

export default Home;
