import { useState, useEffect } from 'react';
import Head from 'next/head';
import MapLoader from 'components/map/MapLoader';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from 'styles/Map.module.scss';
import L from 'leaflet';
import GarbageMarker from './GarbageMarker';

const Map = ({ garbageList }) => {
  if (!garbageList) {
    return <MapLoader />;
  }

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [bounds, setBounds] = useState(null);

  const reduceCorners = (acc, loc) => {
    const newAcc = {
      low: {
        x: loc[0] < acc.low.x || !acc.low.x ? loc[0] : acc.low.x,
        y: loc[1] < acc.low.y || !acc.low.y ? loc[1] : acc.low.y,
      },
      high: {
        x: loc[0] > acc.high.x || !acc.high.x ? loc[0] : acc.high.x,
        y: loc[1] > acc.high.x || !acc.high.y ? loc[1] : acc.high.y,
      },
    };
    return newAcc;
  };

  useEffect(() => {
    if (garbageList) {
      const corners = garbageList.map((garbage) => garbage.geo.localisation).reduce(reduceCorners, { high: { x: null, y: null }, low: { x: null, y: null } });
      setBounds(
        new L.LatLngBounds([
          [corners.low.x, corners.low.y],
          [corners.high.x, corners.high.y],
        ])
      );
    }
  }, [garbageList]);

  useEffect(() => {
    if (map) {
      map.on('zoomend', () => {
        setZoom(map.getZoom());
      });
      if (bounds) {
        map.fitBounds(bounds, { padding: [50, 50] });
      }
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
      <MapContainer className={styles.container} zoom={zoom} whenCreated={setMap}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {garbageList.map((garbage) => (
          <GarbageMarker key={garbage.id} garbage={garbage} zoom={zoom} />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;
