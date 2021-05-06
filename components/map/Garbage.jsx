/* eslint-disable global-require */
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useOverlayContent } from 'contexts/overlay-context';
import GarbageDetail from 'components/GarbageDetail';

const Garbage = ({ garbage, zoom }) => {
  const maxZoom = 18;
  const scale = zoom / maxZoom;
  const baseIconSize = 32;
  const scaledIconSize = baseIconSize * scale;
  const icon = L.icon({
    iconUrl: require('assets/trash-alt-solid.svg'),
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

  const stringToArray = (string) =>
    string
      .substring(1, string.length - 1)
      .split(',')
      .map(parseFloat);

  return <Marker position={stringToArray(garbage.geo.localisation)} icon={icon} eventHandlers={eventHandlers} />;
};

export default Garbage;
