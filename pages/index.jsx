/* eslint-disable jsx-a11y/control-has-associated-label */
import Head from 'next/head';
import layoutStyle from 'styles/Layout.module.css';

const Home = () => (
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

    <div className={layoutStyle.main_map}>MAP</div>

    <div className={layoutStyle.main_btn}>
      {/* eslint-disable-next-line react/button-has-type */}
      <button>Signaler</button>
    </div>
  </>
);

export default Home;
