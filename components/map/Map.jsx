import { useState, useEffect } from 'react';
import Head from 'next/head';
import MapLoader from 'components/map/MapLoader';
import { MapContainer, TileLayer } from 'react-leaflet';
import styles from 'styles/Map.module.scss';
import L from 'leaflet';
import GarbageMarker from './GarbageMarker';
import ClusterMarker from './ClusterMarker';

const Map = ({ garbageList, garbageTypes }) => {
  if (!garbageList) {
    return <MapLoader />;
  }

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState(null);
  const [bounds, setBounds] = useState(null);
  const [clusters, setClusters] = useState([]);
  const [points, setPoints] = useState([]);

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

  const getDistance = (a, b) => Math.sqrt((a.geo.localisation[0] - b.geo.localisation[0]) ** 2 + (a.geo.localisation[1] - b.geo.localisation[1]) ** 2);

  useEffect(() => {
    const dist = 0.032 - 0.0021 * zoom;
    const newClusters = [];
    const newPoints = [];
    let remainingPoints = [...garbageList];
    garbageList.forEach((a) => {
      if (remainingPoints.find((point) => point.id === a.id)) {
        const cluster = [a];
        remainingPoints.forEach((b) => {
          if (a.id !== b.id && getDistance(a, b) < dist) {
            cluster.push(b);
          }
        });
        remainingPoints = remainingPoints.filter((point) => cluster.findIndex((clusterPoint) => point.id === clusterPoint.id) === -1);
        if (cluster.length === 1) {
          newPoints.push(a);
        } else {
          newClusters.push(cluster);
        }
      }
    });
    setClusters(newClusters);
    setPoints(newPoints);
  }, [garbageList, zoom]);

  const renderMarkers = () => (
    <>
      {clusters.map((cluster) => {
        cluster = cluster.filter((point) => garbageTypes.find((el) => el.code === point.type.code && el.checked));

        if (cluster.length > 0) {
          return <ClusterMarker key={cluster[0].id} points={cluster} />;
        }
        return null;
      })}
      {points.map((point) => {
        const type = garbageTypes.find((el) => el.code === point.type.code && el.checked);

        if (type) {
          return <GarbageMarker key={point.id} garbage={point} color={type.color} />;
        }
        return null;
      })}
    </>
  );

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
      <MapContainer className={styles.container} whenCreated={setMap}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {renderMarkers()}
      </MapContainer>
    </>
  );
};

export default Map;
