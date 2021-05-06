/* eslint-disable global-require */
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Garbage = ({ garbage: { localisation }, zoom }) => {
  const maxZoom = 18;
  const scale = zoom / maxZoom;
  const baseIconSize = 32;
  const scaledIconSize = baseIconSize * scale;
  const icon = L.icon({
    iconUrl: require('./trash-alt-solid.svg'),
    iconSize: [scaledIconSize, scaledIconSize],
    iconAnchor: [scaledIconSize / 2, scaledIconSize],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  return <Marker position={localisation} icon={icon} />;
};

export default Garbage;
