import {createAction} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {ActionType} from '../../types/action';
import {UserAdapted} from '../../types/offer';


export const requireLogout = createAction(ActionType.RequireLogout);

export const logoutRequest = createAction(ActionType.LogoutRequest);

export const logoutSuccess = createAction(ActionType.LogoutSuccess);

export const logoutFailure = createAction(
  ActionType.LogoutFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization, (
    authStatus: AuthorizationStatus, userData?: UserAdapted | null,
  ) => ({
    payload: {
      authStatus,
      userData,
    },
  }),
);

export const checkAuthRequest = createAction(ActionType.CheckAuthRequest);

export const checkAuthSuccess = createAction(ActionType.CheckAuthSuccess);

export const checkAuthFailure = createAction(
  ActionType.CheckAuthFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const loginRequest = createAction(ActionType.LoginRequest);

export const loginSuccess = createAction(ActionType.LoginSuccess);

export const loginFailure = createAction(
  ActionType.LoginFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
