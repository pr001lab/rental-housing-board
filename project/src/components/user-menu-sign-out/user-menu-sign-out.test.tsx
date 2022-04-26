import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import {mockUserData} from '../../utils/mocks';
import UserMenuSignOut from './user-menu-sign-out';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {userData: mockUserData},
});

const history = createMemoryHistory();
describe('Component: UserMenuSignOut', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <UserMenuSignOut />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });
});
