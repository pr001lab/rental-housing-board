import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Favorites from './favorites';
import {AuthorizationStatus} from '../../const';
import {mockFavoriteOffer} from '../../utils/mocks';
import {adaptArrayToClient} from '../../store/data/api-actions';

const mockStore = configureMockStore([thunk]);

const store = mockStore({
  USER: {
    electAuthorizationStatus: AuthorizationStatus.Auth,
  },
  DATA: {
    favoriteOffers: adaptArrayToClient([mockFavoriteOffer]),
  },
});

const history = createMemoryHistory();

describe('Component: Favorites page', () => {
  it('should render correctly', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Favorites authorizationStatus={authorizationStatus} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });
});
