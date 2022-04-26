import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {APIRoutes, AuthorizationStatus} from '../../const';
import {
  adaptUserToClient,
  checkAuthAction,
  loginAction,
  logoutAction
} from './api-actions';
import {
  checkAuthRequest,
  checkAuthSuccess,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  requireAuthorization,
  requireLogout
} from './actions';
import {mockUserData} from '../../utils/mocks';
import {AuthData} from '../../types/auth-data';
import {loadOffersRequest} from '../data/actions';


describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should authorization status is "auth" when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoutes.Login)
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      checkAuthRequest(),
      requireAuthorization(AuthorizationStatus.Auth, adaptUserToClient(mockUserData)),
      checkAuthSuccess(),
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const mockAuthData: AuthData = {login: 'mock@mock.ru', password: '1q'};
    mockAPI
      .onPost(APIRoutes.Login)
      .reply(200, mockUserData);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockAuthData));

    expect(store.getActions()).toEqual([
      loginRequest(),
      requireAuthorization(AuthorizationStatus.Auth,adaptUserToClient(mockUserData)),
      loginSuccess(),
      loadOffersRequest(),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoutes.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([
      logoutRequest(),
      requireLogout(),
      logoutSuccess(),
    ]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities');
  });
});
