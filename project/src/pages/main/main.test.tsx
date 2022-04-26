import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, cities, FIRST_CITY_TAB} from '../../const';
import Main from './main';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: Main', () => {
  const store = mockStore({
    USER: {
      loginLoading: false,
    },
    APP: {
      currentCity: FIRST_CITY_TAB,
    },
    DATA: {
      cities: cities,
      offers: [adaptToClient(mockOffer)],
    },
  });

  it('should render correctly', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Main authorizationStatus={authorizationStatus}/>
        </Router>
      </Provider>,
    );

    screen.getByTestId('pageMain').classList.contains('page--main');
  });

});
