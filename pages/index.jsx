/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';
import { get } from 'lib/api';

import Head from 'next/head';
import Map from 'components/map';
import styles from 'styles/Home.module.scss';
import FilterCheckbox from 'components/FilterCheckbox';

const LOC_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const Home = () => {
  const [position, setPosition] = useState([null, null]);
  const [garbageList, setGarbageList] = useState(null);

  const stringToArray = (string) =>
    string
      .substring(1, string.length - 1)
      .split(',')
      .map(parseFloat);

  const getGarbageGeo = async (garbage) => {
    const geo = await get(garbage.geo);
    return { ...garbage, geo: { ...geo, localisation: stringToArray(geo.localisation) } };
  };

  // eslint-disable-next-line consistent-return
  useEffect(async () => {
    try {
      const res = await get('/garbages');
      const garbageListWithoutGeo = res['hydra:member'];
      const garbageListWithGeo = await Promise.all(garbageListWithoutGeo.map(getGarbageGeo));
      setGarbageList(garbageListWithGeo);
    } catch (error) {
      setGarbageList([]);
    }

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
  }, []);

  const geolocate = useCallback((pos) => {
    setPosition([pos.coords.latitude, pos.coords.longitude]);
  });

  console.log('Position', position);

  return (
    <>
      <Head>
        <title>Hedy Lamarr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className="search">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="search" hidden>
            Search the adress:
          </label>
          <input type="search" id="search" name="q" list="search-datalist" placeholder="Recherche" />
          <datalist id="search-datalist">
            <option value="se localiser" />
            <option value="200 rue Machin" />
          </datalist>
        </div>
        <div className={styles['filter-nav']}>
          <FilterCheckbox checked color="green" />
          <FilterCheckbox color="yellow" />
          <FilterCheckbox color="black" />
        </div>
      </header>

      <div className={styles.map}>
        <Map garbageList={garbageList} />
      </div>
    </>
  );
};

export default Home;
