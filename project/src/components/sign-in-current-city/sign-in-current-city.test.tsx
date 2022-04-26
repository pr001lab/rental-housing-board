import {Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import SignInCurrentCity from './sign-in-current-city';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: SignInCurrentCity', () => {
  const store = mockStore({
    USER: {
      loginLoading: false,
    },
  });

  it('should render correctly и redirect to root when user clicked to link', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <h1>Main page</h1>
            </Route>
            <Route>
              <SignInCurrentCity />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    screen
      .getByTestId('locationsLogin')
      .classList
      .contains('locations--login locations--current');
    expect(screen.queryByText(/Main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/Main page/i)).toBeInTheDocument();
  });

});
