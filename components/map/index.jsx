import { useMemo } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = () => {
  const options = {
    loading: () => <p>Loading</p>,
    ssr: false,
  };
  const Map = useMemo(() => dynamic(() => import('./Map.jsx'), options));
  return <Map />;
};

export default DynamicMap;
