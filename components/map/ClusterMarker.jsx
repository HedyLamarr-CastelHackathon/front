/* eslint-disable global-require */
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import GarbageIcon from './GarbageIcon';

const ClusterMarker = ({ points }) => {
  const scale = 1;
  const baseIconSize = 40;
  const scaledIconSize = baseIconSize * scale;
  const icon = L.divIcon({
    iconSize: [scaledIconSize, scaledIconSize],
    iconAnchor: [scaledIconSize / 2, scaledIconSize],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    html: renderToStaticMarkup(<GarbageIcon color="#ffffff" text={points.length} />),
  });

  const map = useMap();

  const onClick = () => {
    map.flyTo(new L.LatLng(points[0].geo.localisation[0], points[0].geo.localisation[1]), 15);
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
