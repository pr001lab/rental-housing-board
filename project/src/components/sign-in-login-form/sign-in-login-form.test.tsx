import {Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInLoginForm from './sign-in-login-form';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: SignInLoginForm', () => {
  const store = mockStore({
    USER: {
      loginLoading: false,
    },
  });

  it('should render correctly', () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignInLoginForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Sign in');
    expect(screen.getByPlaceholderText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();

    userEvent.type(screen.getByTestId('inputemail'), 'test@test.ru');
    userEvent.type(screen.getByTestId('inputpassword'), '1q');

    expect(screen.getByDisplayValue(/test@test.ru/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/1q/i)).toBeInTheDocument();
  });

  it('should submit form when user clicked to login-button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <SignInLoginForm />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });

});
