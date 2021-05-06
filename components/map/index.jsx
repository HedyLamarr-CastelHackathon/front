/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = (props) => {
  const options = {
    loading: () => <p>Loading</p>,
    ssr: false,
  };
  const Map = useMemo(() => dynamic(() => import('./Map.jsx'), options));
  return <Map {...props} />;
};

export default DynamicMap;
