/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';
import { get } from 'lib/api';

import Head from 'next/head';
import Map from 'components/map';
import styles from 'styles/Home.module.css';
import FilterCheckbox from '../components/FilterCheckbox';

const LOC_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const Home = ({ garbageList }) => {
  const [position, setPosition] = useState([null, null]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
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

export async function getServerSideProps() {
  try {
    // const res = await get('/');
    // const members = res['hydra:member'];
    const garbageList = [{ localisation: [47.7367706331, 7.30612428404] }];
    return {
      props: {
        garbageList,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        garbageList: [],
      },
    };
  }
}

export default Home;
