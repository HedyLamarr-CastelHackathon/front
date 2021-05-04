import { get } from 'lib/api';
import Head from 'next/head';
import Image from 'next/image';
import styles from 'styles/Grid.module.css';

const About = ({ members }) => (
  <>
    <Head>
      <title>About - Hedy Lamarr</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <h1 className="title">About Us</h1>

    <p className="description">#CastelHackathon</p>

    <div className={styles.grid}>
      {members.map(({ id, firstname, lastname, gitHub, job, description }) => (
        <a href={gitHub} className={styles.card} key={id}>
          <div className={styles.avatar}>{gitHub !== '' ? <Image src={`${gitHub}.png`} layout="fill" /> : null}</div>
          <h3>
            {firstname} {lastname} &rarr;
          </h3>
          <p>{job}</p>
          <p>{description}</p>
        </a>
      ))}
    </div>
  </>
);

export async function getServerSideProps() {
  try {
    const res = await get('/users');
    const members = res['hydra:member'];
    return {
      props: {
        members,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        members: [],
      },
    };
  }
}

export default About;
