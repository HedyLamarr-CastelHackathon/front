/* eslint-disable jsx-a11y/control-has-associated-label */
import { useCallback, useEffect, useState } from 'react';
import { get } from 'lib/api';

import Head from 'next/head';

import layoutStyle from 'styles/Layout.module.css';

const LOC_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 5000,
};

const Home = ({ garbages }) => {
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

      <header className={layoutStyle.main_header}>
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
        <div>
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
        </div>
      </header>

      <div className={layoutStyle.main_map}>MAP</div>

      <div className={layoutStyle.main_btn}>
        {/* eslint-disable-next-line react/button-has-type */}
        <button>Signaler</button>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const res = await get('/garbages');
    const garbages = res['hydra:garbage'];
    return {
      props: {
        garbages,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        garbages: [],
      },
    };
  }
}

export default Home;
