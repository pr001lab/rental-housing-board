import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import MainOffersBoard from './main-offers-board';
import {AuthorizationStatus, cities, FIRST_CITY_TAB} from '../../const';
import {mockComment, mockOffer} from '../../utils/mocks';
import {adaptArrayToClient} from '../../store/data/api-actions';

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
    favoriteOffers: [mockOffer],
  },
  APP: {
    currentCity: FIRST_CITY_TAB,
  },
});

describe('Component: MainOffersBoard', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router history={history}>
          <MainOffersBoard
            currentCity={FIRST_CITY_TAB}
            offersList={adaptArrayToClient([mockOffer])}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
  });
});
