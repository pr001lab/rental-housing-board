import {Router} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus, cities, SORT_TYPE_DEFAULT} from '../../const';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';
import {ActionType} from '../../types/action';
import OfferSort from './offer-sort';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: OfferSort', () => {

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
          <OfferSort />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
  });

  it('should called action change sorts type when user selected item', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <OfferSort />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getAllByRole('listitem')[0]);
    expect(useDispatch).toBeCalledTimes(2);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.ChangeSort,
      payload: {
        sortType: SORT_TYPE_DEFAULT,
      },
    });
  });

});
