import {Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserCommentForm from './user-comment-form';

const mockStore = configureMockStore();

const store = mockStore({
  DATA: {
    commentLoading: false,
  },
});

const history = createMemoryHistory();
describe('Component: UserCommentForm', () => {
  it('should render correctly when user input review', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <UserCommentForm />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button').textContent).toBe('Submit');
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(
      /To submit review please make sure to set * and describe your stay with at least/i,
    )).toBeInTheDocument();

    userEvent
      .type(screen.getByTestId('reviewsTextarea'), (
        'What an amazing view! The house is stunning and in an amazing location.'
      ));
    expect(screen.getByDisplayValue(
      /What an amazing view! The house is stunning and in an amazing location./i,
    )).toBeInTheDocument();
  });

  it('should submit form when user clicked to submit-button', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <UserCommentForm />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByRole('button'));
    expect(useDispatch).toBeCalledTimes(1);
  });

});
