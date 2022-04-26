import {useEffect, useMemo} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import OfferImage from '../../components/offer-image/offer-image';
import {AppRoutes, AuthorizationStatus, offerTypes, StatusLoading} from '../../const';
import OfferProperty from '../../components/offer-property/offer-property';
import Card from '../../components/card/card';
import {computeRatingWidth} from '../../utils/utils';
import OfferHost from '../../components/offer-host/offer-host';
import OfferComment from '../../components/offer-comment/offer-comment';
import Map from '../../components/map/map';
import {
  favoriteAction,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  fetchOfferCommentsAction
} from '../../store/data/api-actions';
import Loader from '../../components/loader/loader';
import NotFound from '../not-found/not-found';
import Header from '../../components/header/header';
import {selectCurrentOffer} from '../../store/app/actions';
import {
  selectOfferByIdCombo,
  selectOffersNearby
} from '../../store/data/selectors';
import {loadOfferByIdFailure} from '../../store/data/actions';

const MAX_COUNT_NEARBY_OFFERS = 3;

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function Offer({authorizationStatus}: AppScreenProps): JSX.Element {
  const {id: idUrl} = useParams<{id: string}>();
  const dispatch = useDispatch();
  const {offerLoading, offer: currentOffer, offerError} = useSelector(selectOfferByIdCombo);
  const offersNearby = useSelector(selectOffersNearby);
  const history = useHistory();

  const memoHeader = useMemo(() => <Header authorizationStatus={authorizationStatus} />, [authorizationStatus]);

  useEffect(() => {
    dispatch(selectCurrentOffer(currentOffer));
  }, [currentOffer, dispatch]);

  useEffect(() => {
    dispatch(fetchOfferByIdAction(idUrl));
  }, [dispatch, idUrl]);

  useEffect(() => {
    if (!offerError && currentOffer !== null) {
      dispatch(fetchNearbyOffersAction(idUrl));
      dispatch(fetchOfferCommentsAction(idUrl));
    }
  }, [currentOffer, dispatch, idUrl, offerError]);

  useEffect(() => () => {
    dispatch(loadOfferByIdFailure(null));
  }, [dispatch]);

  if (offerError) {
    return <NotFound authorizationStatus={authorizationStatus} />;
  }

  if (
    [StatusLoading.Idle, StatusLoading.Loading].includes(offerLoading)
    || currentOffer === null
  ) {
    return (
      <Loader />
    );
  }

  const handleButtonClick = (idOffer: number) => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(favoriteAction(idOffer, !currentOffer.isFavorite));
    } else {
      history.push(AppRoutes.Login);
    }
  };

  const buttonIsFavorite = cn('property__bookmark-button',
    {
      'property__bookmark-button--active': currentOffer.isFavorite,
    }, 'button');

  return (
    <div className="page">
      {memoHeader}
      <main className="page__main page__main--property">
        <section className="property">
          <OfferImage images={currentOffer.images}/>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
                <button className={buttonIsFavorite}
                  type="button"
                  onClick={() => handleButtonClick(currentOffer.id)}
                >
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {currentOffer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={
                    {width: computeRatingWidth(Number(currentOffer.rating))}
                  }
                  />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {currentOffer.rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {offerTypes[currentOffer.type]}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                      Max {currentOffer.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">
                  &euro;{currentOffer.price}
                </b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer
                    .goods.map((good: string) => (
                      <OfferProperty good={good} key={good} />),
                    )}
                </ul>
              </div>
              <OfferHost
                host={currentOffer.host}
                description={currentOffer.description}
              />
              <OfferComment />
            </div>
          </div>
          <section className="property__map map">
            <Map
              offersList={
                [currentOffer, ...offersNearby.slice(0, MAX_COUNT_NEARBY_OFFERS)]
              }
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              {offersNearby
                .slice(0, MAX_COUNT_NEARBY_OFFERS)
                .map((offer) => (
                  <Card offer={offer} cardType="offer" key={offer.id} />),
                )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );

}

export default Offer;
