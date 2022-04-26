import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Footer from './footer';
import {AuthorizationStatus} from '../../const';

const history = createMemoryHistory();

describe('Component: Footer', () => {
  const authorizationStatus = AuthorizationStatus.Auth;

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Footer authorizationStatus={authorizationStatus} />
      </Router>,
    );

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    screen.getByRole('link').classList.contains('footer container');
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to root when user clicked to link', () => {
    history.push('/fake');

    render(
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <h1>Main page</h1>
          </Route>
          <Route>
            <Footer authorizationStatus={authorizationStatus} />
          </Route>
        </Switch>
      </Router>,
    );

    expect(screen.queryByText(/Main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/Main page/i)).toBeInTheDocument();
  });
});
