import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {adaptToClient} from '../../store/data/api-actions';
import {configureMockStore} from '@jedmao/redux-mock-store';
import OfferComment from './offer-comment';
import {mockComment, mockOffer} from '../../utils/mocks';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: OfferComment', () => {
  const store = mockStore({
    APP: {
      selectedOffer: adaptToClient(mockOffer),
    },
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA: {
      offerComments: [mockComment],
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferComment />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });

});
