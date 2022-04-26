import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {AuthorizationStatus} from '../../const';
import Header from './header';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {mockUserData} from '../../utils/mocks';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: Header', () => {
  const store = mockStore({
    USER: {
      userData: mockUserData,
    },
  });
  const authorizationStatus = AuthorizationStatus.Auth;

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header authorizationStatus={authorizationStatus} />
        </Router>
      </Provider>,
    );

    screen.getByRole('banner').classList.contains('header');
  });

});
