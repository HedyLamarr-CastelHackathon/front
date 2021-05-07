/* eslint-disable global-require */
import { renderToStaticMarkup } from 'react-dom/server';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useOverlayContent } from 'contexts/overlay-context';
import GarbageDetail from 'components/GarbageDetail';
import GarbageIcon from './GarbageIcon';

const GarbageMarker = ({ garbage, color }) => {
  const scale = 1;
  const baseIconSize = 45;
  const scaledIconSize = baseIconSize * scale;
  const icon = L.divIcon({
    iconSize: [scaledIconSize, scaledIconSize],
    iconAnchor: [scaledIconSize / 2, scaledIconSize],
    popupAnchor: null,
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    html: renderToStaticMarkup(<GarbageIcon color={color} />),
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

export default GarbageMarker;
