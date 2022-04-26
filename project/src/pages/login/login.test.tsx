import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus} from '../../const';
import Login from './login';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: Login', () => {
  const store = mockStore({
    USER: {
      loginLoading: false,
    },
  });

  it('should render correctly', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={store}>
        <Router history={history}>
          <Login authorizationStatus={authorizationStatus}/>
        </Router>
      </Provider>,
    );

    screen.getByTestId('pageLogin').classList.contains('page--login');
  });

});
