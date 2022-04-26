import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {User} from '../../types/offer';
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
  requireAuthorization,
  requireLogout
} from './actions';

export type userType = {
  authorizationStatus: AuthorizationStatus,
  userData?: User | null,
  checkAuthLoading: boolean,
  loginLoading: boolean,
  logoutLoading: boolean,
  error: string | null,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  checkAuthLoading: false,
  loginLoading: false,
  logoutLoading: false,
  error: null,
};

const userProcess = createReducer(initialState, (builder) => {
  builder
    .addCase(requireLogout, (state: userType, action) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    })
    .addCase(logoutRequest, (state: userType, action) => {
      state.logoutLoading = true;
    })
    .addCase(logoutSuccess, (state: userType, action) => {
      state.logoutLoading = false;
    })
    .addCase(logoutFailure, (state: userType, action) => {
      const {error} = action.payload;
      state.logoutLoading = false;
      state.error = error;
    })
    .addCase(requireAuthorization, (state: userType, action) => {
      const {authStatus, userData} = action.payload;
      state.authorizationStatus = authStatus;
      state.userData = userData;
    })
    .addCase(checkAuthRequest, (state: userType, action) => {
      state.checkAuthLoading = true;
    })
    .addCase(checkAuthSuccess, (state: userType, action) => {
      state.checkAuthLoading = false;
    })
    .addCase(checkAuthFailure, (state: userType, action) => {
      const {error} = action.payload;
      state.checkAuthLoading = false;
      state.error = error;
    })
    .addCase(loginRequest, (state: userType, action) => {
      state.loginLoading = true;
    })
    .addCase(loginSuccess, (state: userType, action) => {
      state.loginLoading = false;
    })
    .addCase(loginFailure, (state: userType, action) => {
      const {error} = action.payload;
      state.checkAuthLoading = false;
      state.loginLoading = false;
      state.error = error;
    });
});

export {userProcess};
