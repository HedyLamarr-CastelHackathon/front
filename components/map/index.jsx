/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import Loader from 'components/map/MapLoader';

const DynamicMap = (props) => {
  const options = {
    loading: Loader,
    ssr: false,
  };
  const Map = useMemo(() => dynamic(() => import('./Map.jsx'), options));
  return <Map {...props} />;
};

export default DynamicMap;
