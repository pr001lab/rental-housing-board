import {Action} from 'redux';
import {AxiosInstance} from 'axios';
import {ThunkAction} from 'redux-thunk';
import {State} from './state';

export enum ActionType {
  ChangeSort = 'changeSort',
  ChangeCity = 'city/change',
  SelectCurrentOffer = 'currentOffer/select',
  RequireAuthorization = 'auth/requireAuthorization',
  RequireLogout = 'auth/requireLogout',
  LoadOffersRequest = 'offers/loadRequest',
  LoadOffersSuccess = 'offers/loadSuccess',
  LoadOffersFailure = 'offers/loadFailure',
  LoadOfferByIdRequest = 'offerById/loadRequest',
  LoadOfferByIdSuccess = 'offerById/loadSuccess',
  LoadOfferByIdFailure = 'offerById/loadFailure',
  LoadOffersNearbyRequest = 'offersNearby/loadRequest',
  LoadOffersNearbySuccess = 'offersNearby/loadSuccess',
  LoadOffersNearbyFailure = 'offersNearby/loadFailure',
  LoadOfferCommentsRequest = 'offerComments/loadRequest',
  LoadOfferCommentsSuccess = 'offerComments/loadSuccess',
  LoadOfferCommentsFailure = 'offerComments/loadFailure',
  PostOfferCommentRequest = 'offerComment/postRequest',
  PostOfferCommentSuccess = 'offerComment/postSuccess',
  PostOfferCommentFailure = 'offerComment/postFailure',
  FetchFavoriteRequest = 'favorite/fetchRequest',
  FetchFavoriteSuccess = 'favorite/fetchSuccess',
  FetchFavoriteFailure = 'favorite/fetchFailure',
  PostFavoriteRequest = 'favorite/postRequest',
  PostFavoriteSuccess = 'favorite/postSuccess',
  PostFavoriteFailure = 'favorite/postFailure',
  CheckAuthRequest = 'auth/checkRequest',
  CheckAuthSuccess = 'auth/checkSuccess',
  CheckAuthFailure = 'auth/checkFailure',
  LoginRequest = 'auth/loginRequest',
  LoginSuccess = 'auth/loginSuccess',
  LoginFailure = 'auth/loginFailure',
  LogoutRequest = 'auth/logoutRequest',
  LogoutSuccess = 'auth/logoutSuccess',
  LogoutFailure = 'auth/logoutFailure',
  ClearCommentForm = 'CommentForm/clear',
}

export type ThunkActionResult<R = Promise<void>>
  = ThunkAction<R, State, AxiosInstance, Action>;
