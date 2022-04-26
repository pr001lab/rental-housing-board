import {Router} from 'react-router';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import NotFound from './not-found';
import {AuthorizationStatus} from '../../const';

const mockStore = configureMockStore();

const store = mockStore({
  USER: {
    electAuthorizationStatus: AuthorizationStatus.Auth,
  },
});

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const authorizationStatus = AuthorizationStatus.Auth;

    const {getByText} = render(
      <Provider store={store}>
        <Router history={history}>
          <NotFound  authorizationStatus={authorizationStatus} />
        </Router>
      </Provider>,
    );

    const headerElement = getByText('404 Not Found.');
    const linkElement = getByText('Go to Main page');

    expect(headerElement).toBeInTheDocument();
    expect(linkElement).toBeInTheDocument();
  });
});
