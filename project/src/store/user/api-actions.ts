import {toast} from 'react-toastify';
import {
  checkAuthFailure,
  checkAuthRequest,
  checkAuthSuccess,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutFailure,
  logoutRequest,
  logoutSuccess,
  requireAuthorization, requireLogout
} from './actions';
import {APIRoutes, AuthorizationStatus, ErrorTexts} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {AuthData} from '../../types/auth-data';
import {dropToken, saveToken} from '../../services/token';
import {fetchOffersAction} from '../data/api-actions';
import {User, UserAdapted} from '../../types/offer';

export const adaptUserToClient = (userData: UserAdapted): User => {
  const adaptedUser = {
    ...userData,
    isPro: userData['is_pro'],
    avatarUrl: userData['avatar_url'],
  };

  delete adaptedUser['avatar_url'];
  delete adaptedUser['is_pro'];

  return adaptedUser;
};

export const checkAuthAction = (): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(checkAuthRequest());
    try {
      const {data} = await api.get(APIRoutes.Login);
      dispatch(requireAuthorization(
        AuthorizationStatus.Auth,
        adaptUserToClient(data)),
      );
      dispatch(checkAuthSuccess());
    } catch (error: any) {
      dispatch(checkAuthFailure(error.toString()));
    }
  }
);

export const loginAction = (
  {login: email, password}: AuthData,
): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(loginRequest());
    try {
      const {data} = await api.post(APIRoutes.Login, {email, password});
      const {token} = data;
      saveToken(token);
      dispatch(requireAuthorization(
        AuthorizationStatus.Auth,
        adaptUserToClient(data)),
      );
      dispatch(loginSuccess());
      dispatch(fetchOffersAction());
    } catch (error: any) {
      dispatch(loginFailure(error.toString()));
      toast.warn(ErrorTexts.LOGIN_FAIL_MESSAGE);
    }
  }
);

export const logoutAction = (): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(logoutRequest());
    try {
      api.delete(APIRoutes.Logout);
      dropToken();
      dispatch(requireLogout());
      dispatch(logoutSuccess());
    } catch (error: any) {
      dispatch(logoutFailure(error.toString()));
    }
  }
);
