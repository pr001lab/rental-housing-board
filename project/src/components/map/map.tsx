import {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {Icon, LayerGroup, Marker} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/useMap/useMap';
import {OfferType} from '../../types/offer';
import {selectSelectedOffer} from '../../store/app/selectors';

export const URL_MARKER_DEFAULT = 'img/pin.svg';
export const URL_MARKER_SELECT = 'img/pin-active.svg';

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [26, 40],
  iconAnchor: [13, 40],
});

const selectCustomIcon = new Icon({
  iconUrl: URL_MARKER_SELECT,
  iconSize: [26, 40],
  iconAnchor: [13, 40],
});

type AppScreenProps = {
  offersList: OfferType[];
}

function Map({offersList}: AppScreenProps): JSX.Element {
  const selectedOffer = useSelector(selectSelectedOffer);
  const [{city}] = offersList;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markerLayerRef = useRef<LayerGroup>();

  useEffect(() => {
    if (map) {
      if (markerLayerRef.current) {
        markerLayerRef.current.clearLayers();
      }

      markerLayerRef.current = new LayerGroup().addTo(map);

      if (markerLayerRef.current) {
        offersList.forEach((offer) => {
          const {location} = offer;
          const marker = new Marker({
            lat: location.latitude,
            lng: location.longitude,
          });

          marker
            .setIcon(
              offer.id === selectedOffer?.id
                ? selectCustomIcon
                : defaultCustomIcon,
            )
            .addTo(markerLayerRef.current as LayerGroup);
        });
      }

    }
  }, [selectedOffer?.id, map, offersList]);

  return (
    <div
      style={{minHeight: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
