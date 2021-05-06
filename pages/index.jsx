/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { get } from 'lib/api';
import styles from 'styles/Home.module.scss';
import Map from 'components/map';

const Home = () => {
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

  useEffect(async () => {
    try {
      const res = await get('/garbages');
      const garbageListWithoutGeo = res['hydra:member'];
      const garbageListWithGeo = await Promise.all(garbageListWithoutGeo.map(getGarbageGeo));
      setGarbageList(garbageListWithGeo);
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
