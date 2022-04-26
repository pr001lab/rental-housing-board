import Card from '../card/card';
import {OfferType} from '../../types/offer';

type AppScreenProps = {
  offersList: OfferType[];
}

function CardsList({offersList}: AppScreenProps): JSX.Element {

  return (
    <div className="cities__places-list places__list tabs__content">
      {offersList
        .map((offer) =>
          (
            <Card
              offer={offer}
              cardType="cardsList"
              key={offer.id}
            />
          ))}
    </div>
  );
}

export default CardsList;
