/* eslint-disable jsx-a11y/anchor-is-valid */
import Head from 'next/head';
import Link from 'next/link';
import styles from 'styles/Grid.module.css';

const Home = () => (
  <div className={styles.container}>
    <Head>
      <title>Hedy Lamarr</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className="title">Welcome!</h1>

      <p className="description">#CastelHackathon</p>

      <div className={styles.grid}>
        <a href="https://github.com/HedyLamarr-CastelHackathon" className={styles.card}>
          <h3>GitHub &rarr;</h3>
          <p>Front and back end repositories for the project.</p>
        </a>

        <Link href="/about">
          <a className={styles.card}>
            <h3>About &rarr;</h3>
            <p>Meet the members of the team!</p>
          </a>
        </Link>
      </div>
    </main>
  </div>
);

export default Home;
