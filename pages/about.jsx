import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/Grid.module.css';

const About = ({ members }) => (
  <div className={styles.container}>
    <Head>
      <title>About - Hedy Lamarr</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.main}>
      <h1 className="title">About Us</h1>

      <p className="description">#CastelHackathon</p>

      <div className={styles.grid}>
        {members.map(({ id, name, githubUsername, role, stack }) => (
          <a href={`https://github.com/${githubUsername}`} className={styles.card} key={id}>
            <div className={styles.avatar}>
              <Image src={`https://github.com/${githubUsername}.png`} layout="fill" />
            </div>
            <h3>{name} &rarr;</h3>
            <p>{role}</p>
            <p>{stack}</p>
          </a>
        ))}
      </div>
    </main>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      members: [
        { id: 1, name: 'Benjamin Cloquet', githubUsername: 'benjamincloquet', role: 'Front End Developer', stack: 'React, Next.js' },
        { id: 2, name: 'Cyril Vassallo', githubUsername: 'cyril-vassallo', role: 'Back End Developer', stack: 'Symfony' },
        { id: 3, name: 'Younes Boukobaa', githubUsername: 'foybkaa', role: 'Back End Developer', stack: '' },
        { id: 4, name: 'Vincent Landrieux', githubUsername: 'VincentLandrieux', role: 'Front End Developer', stack: '' },
      ],
    },
  };
}

export default About;
