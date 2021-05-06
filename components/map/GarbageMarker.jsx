/* eslint-disable global-require */
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useOverlayContent } from 'contexts/overlay-context';
import GarbageDetail from 'components/GarbageDetail';

const Garbage = ({ garbage }) => {
  const maxZoom = 18;
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

  const { dispatch } = useOverlayContent();

  const onClick = () => {
    dispatch({ type: 'show', payload: { component: GarbageDetail, props: { garbage } } });
  };

  const eventHandlers = {
    click: onClick,
  };

  return <Marker position={garbage.geo.localisation} icon={icon} eventHandlers={eventHandlers} />;
};

export default Garbage;