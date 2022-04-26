import {AuthorizationStatus} from '../../const';
import {ActionType} from '../../types/action';
import {userProcess} from './user';


describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(userProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        checkAuthLoading: false,
        loginLoading: false,
        logoutLoading: false,
        error: null,
      });
  });

  it('should update authorizationStatus to "AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      checkAuthLoading: false,
      loginLoading: false,
      logoutLoading: false,
      error: null,
    };
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: {
        authStatus: AuthorizationStatus.Auth,
        userData: null,
      },
    };

    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
        checkAuthLoading: false,
        loginLoading: false,
        logoutLoading: false,
        error: null,
      });
  });

  it('should update authorizationStatus to "NO_AUTH"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
      checkAuthLoading: false,
      loginLoading: false,
      logoutLoading: false,
      error: null,
    };
    const requiredAuthorizationAction = {
      type: ActionType.RequireAuthorization,
      payload: {
        authStatus: AuthorizationStatus.NoAuth,
        userData: null,
      },
    };

    expect(userProcess(state, requiredAuthorizationAction))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        userData: null,
        checkAuthLoading: false,
        loginLoading: false,
        logoutLoading: false,
        error: null,
      });
  });
});
