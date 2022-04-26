import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import cn from 'classnames';
import Filter from '../../components/filter/filter';
import Header from '../../components/header/header';
import MainOffersBoard from '../../components/main-offers-board/main-offers-board';
import MainOffersEmpty from '../../components/main-offers-empty/main-offers-empty';
import ErrorScreen from '../error-screen/error-screen';
import {
  selectCurrentCity,
  selectFilteredSortedOffers
} from '../../store/app/selectors';
import {selectErrorLoadOffers} from '../../store/data/selectors';
import {AuthorizationStatus} from '../../const';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function Main({authorizationStatus}: AppScreenProps): JSX.Element {
  const currentCity = useSelector(selectCurrentCity);
  const offersList = useSelector(selectFilteredSortedOffers);
  const errorLoadOffers = useSelector(selectErrorLoadOffers);

  const memoHeader = useMemo(
    () => <Header authorizationStatus={authorizationStatus} />,
    [authorizationStatus],
  );

  const pageMainIndexCls = cn('page__main page__main--index',
    {'page__main--index-empty': !(offersList.length > 0)});

  const citiesPlacesContainerCls = cn('cities__places-container',
    {'cities__places-container--empty': !(offersList.length > 0)}, 'container');

  if (errorLoadOffers) {
    return <ErrorScreen authorizationStatus={authorizationStatus}/>;
  }

  return (
    <div
      className="page page--gray page--main"
      data-testid="pageMain"
    >
      {memoHeader}
      <main className={pageMainIndexCls}>
        <Filter />
        <div className="cities">
          <div className={citiesPlacesContainerCls}>
            {offersList.length > 0
              ? <MainOffersBoard currentCity={currentCity} offersList={offersList} />
              : <MainOffersEmpty currentCity={currentCity} />}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
