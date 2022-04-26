import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoutes, AuthorizationStatus, cities, FIRST_CITY_TAB} from '../../const';
import {mockComment, mockOffer} from '../../utils/mocks';
import Offer from './offer';

const mockStore = configureMockStore([thunk]);

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
  },
  APP: {
    currentCity: FIRST_CITY_TAB,
  },
});

describe('Component: Offer page', () => {
  it('should render Offer page when user navigate to "/offer/id" url', () => {
    const history = createMemoryHistory();
    const authorizationStatus = AuthorizationStatus.NoAuth;
    history.push(`${AppRoutes.Offer}/1`);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Offer authorizationStatus={authorizationStatus}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/other places in the neighbourhood/i))
      .toBeInTheDocument();
  });
});
