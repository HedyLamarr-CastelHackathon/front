import { useState, useEffect } from 'react';
import Head from 'next/head';
import MapLoader from 'components/map/MapLoader';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from 'styles/Map.module.css';
import Garbage from './Garbage';

const Map = ({ garbageList }) => {
  if (!garbageList) {
    return <MapLoader />;
  }

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(10);

  useEffect(() => {
    if (map) {
      map.on('zoomend', () => {
        setZoom(map.getZoom());
      });
    }
  }, [map]);

  return (
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
      <MapContainer className={styles.container} center={[47.7367706331, 7.30612428404]} zoom={zoom} whenCreated={setMap}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {garbageList.map((garbage) => (
          <Garbage garbage={garbage} zoom={zoom} />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
