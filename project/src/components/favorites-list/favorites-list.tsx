import {OfferType} from '../../types/offer';
import Card from '../card/card';

type AppScreenProps = {
  offersFavoriteListBySities: {[key: string]: OfferType[]};
}

function FavoritesList({offersFavoriteListBySities}: AppScreenProps): JSX.Element {
  return (
    <ul className="favorites__list">
      {Object.keys(offersFavoriteListBySities)
        .map((city) => (
          <li className="favorites__locations-items" key={city}>
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <a className="locations__item-link" href="/#">
                  <span>{city}</span>
                </a>
              </div>
            </div>
            <div className="favorites__places">
              {offersFavoriteListBySities[city]
                .map((offer) =>
                  <Card offer={offer} cardType="favorites" key={offer.id} />)}
            </div>
          </li>
        ))}
    </ul>
  );
}

export default FavoritesList;
