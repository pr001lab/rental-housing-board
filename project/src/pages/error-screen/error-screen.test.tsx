import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import {AuthorizationStatus} from '../../const';
import ErrorScreen from './error-screen';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {electAuthorizationStatus: AuthorizationStatus.Auth},
});

const history = createMemoryHistory();

describe('Component: ErrorScreen page', () => {
  it('should render correctly', () => {
    const authorizationStatus = AuthorizationStatus.Auth;

    render(
      <Provider store={store}>
        <Router history={history}>
          <ErrorScreen authorizationStatus={authorizationStatus} />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Something went wrong. Try again later./i))
      .toBeInTheDocument();
  });
});
