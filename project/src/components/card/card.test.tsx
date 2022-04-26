import {Route, Router, Switch} from 'react-router-dom';
import * as Redux from 'react-redux';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {createMemoryHistory} from 'history';
import {AppRoutes, AuthorizationStatus} from '../../const';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';
import Card from './card';
import {ActionType} from '../../types/action';

const history = createMemoryHistory();

const mockStore = configureMockStore();

describe('Component: Card', () => {

  const store = mockStore({
    USER: {
      authorizationStatus: AuthorizationStatus.Auth,
    },
    DATA: {
      offers: [adaptToClient(mockOffer)],
    },
  });
  const offer = adaptToClient(mockOffer);
  const cardType = 'cardsList';

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Card
            offer={offer}
            cardType={cardType}
          />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to Offer page when user clicked to cards link', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route exact path={`${AppRoutes.Offer}/11`}>
              <h1>Offer page</h1>
            </Route>
            <Route>
              <Card
                offer={offer}
                cardType={cardType}
              />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Offer page/i)).not.toBeInTheDocument();

    userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/Offer page/i)).toBeInTheDocument();
  });

  it('should called action show marker on map when user hover on card', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={store}>
        <Router history={history}>
          <Card
            offer={offer}
            cardType={cardType}
          />
        </Router>
      </Provider>,
    );

    userEvent.hover(screen.getByTestId('imageHover'));
    expect(useDispatch).toBeCalledTimes(1);
    expect(dispatch).nthCalledWith(1, {
      type: ActionType.SelectCurrentOffer,
      payload: {
        offer: adaptToClient(mockOffer),
      },
    });
  });
});
