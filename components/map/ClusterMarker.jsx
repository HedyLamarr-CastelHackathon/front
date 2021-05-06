/* eslint-disable global-require */
import { Marker } from 'react-leaflet';
import L from 'leaflet';

const ClusterMarker = ({ points }) => {
  const scale = 1;
  const baseIconSize = 32;
  const scaledIconSize = baseIconSize * scale;
  const icon = L.icon({
    iconUrl: require('assets/trash-alt-solid-green.svg'),
    iconSize: [scaledIconSize, scaledIconSize],
    iconAnchor: [scaledIconSize / 2, scaledIconSize],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });

  const onClick = () => {
    console.log(points);
  };

  const eventHandlers = {
    click: onClick,
  };

  return (
    <>
      <Marker position={points[0].geo.localisation} icon={icon} eventHandlers={eventHandlers}>
        <p>{points.length}</p>
      </Marker>
    </>
  );
};

export default ClusterMarker;
