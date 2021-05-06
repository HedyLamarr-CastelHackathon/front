import Head from 'next/head';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from 'styles/Map.module.css';
import Garbage from './Garbage';

const Map = ({ garbageList }) => (
  <>
    <Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      />
    </Head>
    <MapContainer className={styles.container} center={[0, 0]} zoom={10}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {garbageList.map((garbage) => (
        <Garbage garbage={garbage} />
      ))}
    </MapContainer>
  </>
);

export default Map;
