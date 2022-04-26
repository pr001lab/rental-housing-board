import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../../types/action';
import {CommentType} from '../../types/comment';
import {OfferType} from '../../types/offer';

export const clearCommentForm = createAction(ActionType.ClearCommentForm);

export const loadOffersRequest = createAction(ActionType.LoadOffersRequest);

export const loadOffersSuccess = createAction(
  ActionType.LoadOffersSuccess, (offers: OfferType[]) => ({
    payload: {
      offers,
    },
  }),
);

export const loadOffersFailure = createAction(
  ActionType.LoadOffersFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const loadOfferByIdRequest = createAction(ActionType.LoadOfferByIdRequest);

export const loadOfferByIdSuccess = createAction(
  ActionType.LoadOfferByIdSuccess, (offer: OfferType) => ({
    payload: {
      offer,
    },
  }),
);

export const loadOfferByIdFailure = createAction(
  ActionType.LoadOfferByIdFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const loadOffersNearbyRequest = createAction(ActionType.LoadOffersNearbyRequest);

export const loadOffersNearbySuccess = createAction(
  ActionType.LoadOffersNearbySuccess, (offers: OfferType[]) => ({
    payload: {
      offers,
    },
  }),
);

export const loadOffersNearbyFailure = createAction(
  ActionType.LoadOffersNearbyFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const loadOfferCommentsRequest = createAction(ActionType.LoadOfferCommentsRequest);

export const loadOfferCommentsSuccess = createAction(
  ActionType.LoadOfferCommentsSuccess, (comments: CommentType[]) => ({
    payload: {
      comments,
    },
  }),
);

export const loadOfferCommentsFailure = createAction(
  ActionType.LoadOfferCommentsFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const postOfferCommentRequest = createAction(ActionType.PostOfferCommentRequest);

export const postOfferCommentSuccess = createAction(
  ActionType.PostOfferCommentSuccess, (comments: CommentType[]) => ({
    payload: {
      comments,
    },
  }),
);

export const postOfferCommentFailure = createAction(
  ActionType.PostOfferCommentFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const fetchFavoriteRequest = createAction(ActionType.FetchFavoriteRequest);

export const fetchFavoriteSuccess = createAction(
  ActionType.FetchFavoriteSuccess, (offers: OfferType[]) => ({
    payload: {
      offers,
    },
  }),
);

export const fetchFavoriteFailure = createAction(
  ActionType.FetchFavoriteFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);

export const postFavoriteRequest = createAction(
  ActionType.PostFavoriteRequest);

export const postFavoriteSuccess = createAction(
  ActionType.PostFavoriteSuccess, (id: number, status: boolean) => ({
    payload: {
      id,
      status,
    },
  }),
);

export const postFavoriteFailure = createAction(
  ActionType.PostFavoriteFailure, (error: string | null) => ({
    payload: {
      error,
    },
  }),
);
