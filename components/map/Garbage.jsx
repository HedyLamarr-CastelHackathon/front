import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const Garbage = ({ localisation }) => {
  const icon = L.icon({
    iconUrl: require('./trash-alt-solid.svg'),
    iconSize: [64, 64],
    iconAnchor: [32, 64],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
  });
  return (
    <Marker position={localisation} icon={icon}>
      <Popup>hello!</Popup>
    </Marker>
  );
};

export default Garbage;
