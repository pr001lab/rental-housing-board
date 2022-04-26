import {Redirect, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Offer from '../../pages/offer/offer';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Main from '../../pages/main/main';
import {AppRoutes, AuthorizationStatus} from '../../const';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../../private-route/private-route';
import Loader from '../loader/loader';
import {selectOffersLoading} from '../../store/data/selectors';
import {selectAuthorizationStatus} from '../../store/user/selectors';

function App(): JSX.Element {
  const offersLoading = useSelector(selectOffersLoading);
  const authorizationStatus = useSelector(selectAuthorizationStatus);

  if (offersLoading) {
    return (
      <Loader />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoutes.Main}>
        <Main authorizationStatus={authorizationStatus} />
      </Route>
      <Route
        exact
        path={AppRoutes.Login}
        render={() => (
          authorizationStatus === AuthorizationStatus.Auth
            ? <Redirect to={AppRoutes.Main} />
            : <Login authorizationStatus={authorizationStatus} />
        )}
      >
      </Route>
      <PrivateRoute
        exact
        path={AppRoutes.Favorites}
        render = {() => <Favorites authorizationStatus={authorizationStatus} />}
      >
      </PrivateRoute>
      <Route exact path={`${AppRoutes.Offer}/:id`}>
        <Offer authorizationStatus={authorizationStatus} />
      </Route>
      <Route exact component={NotFound}/>
    </Switch>
  );
}

export default App;
