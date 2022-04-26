import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoutes, AuthorizationStatus, cities, FIRST_CITY_TAB} from '../../const';
import App from './app';
import {mockComment, mockOffer} from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);

describe('Application Routing', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.NoAuth,
    },
    DATA: {
      cities: cities,
      offers: [mockOffer],
      offerById: mockOffer,
      offersNearby: [mockOffer],
      offerComments: [mockComment],
      favoriteOffers: [mockOffer],
    },
    APP: {
      currentCity: FIRST_CITY_TAB,
    },
  });

  const history = createMemoryHistory();
  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  it('should render Main page when user navgate to "/"', () => {
    history.push(AppRoutes.Main);
    render(fakeApp);

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });

  it('should render Login page when user navgate to "/login"', () => {
    history.push(AppRoutes.Login);
    render(fakeApp);

    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
  });

  it('should render Offer page when user navgate to "/offer/id"', () => {
    history.push(`${AppRoutes.Offer}/1`);
    render(fakeApp);

    expect(screen.getByText(/other places in the neighbourhood/i)).toBeInTheDocument();
  });

  it('should render NotFound page when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('404 Not Found.')).toBeInTheDocument();
    expect(screen.getByText('Go to Main page')).toBeInTheDocument();
  });

});

describe('Application Routing: Favorite', () => {
  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA: {
      cities: cities,
      offers: [mockOffer],
      offerById: mockOffer,
      offersNearby: [mockOffer],
      offerComments: [mockComment],
      favoriteOffers: [mockOffer],
    },
    APP: {
      currentCity: FIRST_CITY_TAB,
    },
  });

  const history = createMemoryHistory();
  const fakeApp = (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );

  it('should render Favorite page when user navgate to "/favorites"', () => {
    history.push(AppRoutes.Favorites);
    render(fakeApp);

    expect(screen.getByText(/saved listing/i)).toBeInTheDocument();
  });

});
