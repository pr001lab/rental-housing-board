import {Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, cities} from '../../const';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';
import {ActionType} from '../../types/action';
import Filter from './filter';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: Filter', () => {

  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA: {
      cities: cities,
      offers: [adaptToClient(mockOffer)],
    },
    APP: {
      currentCity: cities[0],
    },
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(6);
  });

  it('should called action change city when user clicked to the link', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Filter />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getAllByRole('link')[0]);
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.ChangeCity,
      payload: {
        city: cities[0],
      },
    });
  });

});
