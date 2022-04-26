import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import UserMenu from './user-menu';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: UserMenu', () => {
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
          <UserMenu authorizationStatus={authorizationStatus}/>
        </Router>
      </Provider>,
    );

    screen.getByRole('navigation').classList.contains('header__nav');
  });

});
