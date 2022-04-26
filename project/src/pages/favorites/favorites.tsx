import {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import FavoritesList from '../../components/favorites-list/favorites-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import {fetchFavoritesAction} from '../../store/data/api-actions';
import {selectFavoriteOffers} from '../../store/data/selectors';
import {getOffersFavoriteListBySities} from '../../utils/utils';
import {AuthorizationStatus} from '../../const';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function Favorites({authorizationStatus}: AppScreenProps): JSX.Element {
  const offersList = useSelector(selectFavoriteOffers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavoritesAction());
  }, [dispatch]);

  const memoHeader = useMemo(() => <Header authorizationStatus={authorizationStatus} />, [authorizationStatus]);

  const memoFooter = useMemo(() => <Footer authorizationStatus={authorizationStatus} />, [authorizationStatus]);

  const offersFavoriteListBySities = getOffersFavoriteListBySities(offersList);

  const pageCls = cn('page', {'page--favorites-empty': offersList.length > 0});
  const pageMainCls = cn('page__main page__main--favorites', {'page__main--favorites-empty': offersList.length > 0});

  return (
    <div className={pageCls}>
      {memoHeader}
      <main className={pageMainCls}>
        <div className="page__favorites-container container">
          {offersList.length > 0
            ? (
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <FavoritesList
                  offersFavoriteListBySities={offersFavoriteListBySities}
                />
              </section>
            )
            : (
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
                </div>
              </section>
            )}
        </div>
      </main>
      {memoFooter}
    </div>
  );
}

export default Favorites;
