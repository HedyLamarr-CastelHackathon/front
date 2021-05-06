/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { get } from 'lib/api';
import styles from 'styles/Home.module.scss';
import Map from 'components/map';

const Home = () => {
  const [garbageList, setGarbageList] = useState(null);

  useEffect(async () => {
    try {
      // const res = await get('/garbages');
      // const garbageList = res['hydra:member'];
      const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));
      await wait(1000);
      setGarbageList([{ geo: [47.7367706331, 7.30612428404] }]);
    } catch (error) {
      setGarbageList([]);
    }
  }, []);

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
            <option value="Internet Explorer" />
            <option value="Firefox" />
            <option value="Chrome" />
            <option value="Opera" />
            <option value="Safari" />
          </datalist>
        </div>
        <div>
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
          <input type="checkbox" name="" id="" />
        </div>
      </header>

      <div className={styles.map}>
        <Map garbageList={garbageList} />
      </div>
    </>
  );
};

export default Home;
