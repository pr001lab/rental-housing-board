import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import SignIn from './sign-in';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: SignIn', () => {
  const store = mockStore({
    USER: {
      loginLoading: false,
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <SignIn />
        </Router>
      </Provider>,
    );

    screen
      .getByTestId('pageLoginContainer')
      .classList.contains('page__login-container container');
  });

});
