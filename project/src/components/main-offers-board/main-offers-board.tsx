import CardsList from '../cards-list/cards-list';
import OfferSort from '../offer-sort/offer-sort';
import {OfferType} from '../../types/offer';
import Map from '../map/map';

type AppScreenProps = {
  currentCity: string;
  offersList: OfferType[];
}

function MainOffersBoard({currentCity, offersList}: AppScreenProps): JSX.Element {
  return (
    <>
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {offersList.length} places to stay in {currentCity}
        </b>
        <OfferSort />
        <CardsList offersList={offersList} />
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map offersList={offersList} />
        </section>
      </div>
    </>
  );
}

export default MainOffersBoard;
