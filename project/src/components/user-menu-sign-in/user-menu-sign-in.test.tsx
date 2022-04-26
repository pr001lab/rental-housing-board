import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Router} from 'react-router-dom';
import UserMenuSignIn from './user-menu-sign-in';

const history = createMemoryHistory();
describe('Component: UserMenuSignIn', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <UserMenuSignIn />
      </Router>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });
});
