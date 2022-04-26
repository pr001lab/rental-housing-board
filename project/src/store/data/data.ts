import {createReducer} from '@reduxjs/toolkit';
import {StatusLoading} from '../../const';
import {cities} from '../../const';
import {
  clearCommentForm,
  fetchFavoriteFailure,
  fetchFavoriteRequest,
  fetchFavoriteSuccess,
  loadOfferByIdFailure,
  loadOfferByIdRequest,
  loadOfferByIdSuccess,
  loadOfferCommentsFailure,
  loadOfferCommentsRequest,
  loadOfferCommentsSuccess,
  loadOffersFailure,
  loadOffersNearbyFailure,
  loadOffersNearbyRequest,
  loadOffersNearbySuccess,
  loadOffersRequest,
  loadOffersSuccess,
  postFavoriteFailure,
  postFavoriteRequest,
  postFavoriteSuccess,
  postOfferCommentFailure,
  postOfferCommentRequest,
  postOfferCommentSuccess
} from './actions';
import {OfferType} from '../../types/offer';
import {CommentType} from '../../types/comment';

export type DataType = {
  cities: string[],
  offers: OfferType[],
  offersLoading: boolean,
  errorLoadOffers: string | null,
  offerById: OfferType | null,
  offerByIdLoading: StatusLoading,
  errorLoadOfferById: string | null,
  offersNearby: OfferType[],
  offersNearbyLoading: boolean,
  errorLoadOffersNearby: string | null,
  offerComments: CommentType[],
  offerCommentsLoading: boolean,
  errorLoadOfferComments: string | null,
  commentLoading: boolean,
  errorPostOfferComment: string | null,
  favoriteOffers: OfferType[],
  fetchFavoriteLoading: boolean,
  errorFetchFavorite: string | null,
  favoriteLoading: boolean,
  errorPostFavorite: string | null,
  isClearCommentForm: boolean,
};

const initialState: DataType = {
  cities: cities,
  offers: [],
  offersLoading: false,
  errorLoadOffers: null,
  offerById: null,
  offerByIdLoading: StatusLoading.Idle,
  errorLoadOfferById: null,
  offersNearby: [],
  offersNearbyLoading: false,
  errorLoadOffersNearby: null,
  offerComments: [],
  offerCommentsLoading: false,
  errorLoadOfferComments: null,
  commentLoading: false,
  errorPostOfferComment: null,
  favoriteOffers: [],
  fetchFavoriteLoading: false,
  errorFetchFavorite: null,
  favoriteLoading: false,
  errorPostFavorite: null,
  isClearCommentForm: false,
};

const appData = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffersRequest, (state, action) => {
      state.offersLoading = true;
    })
    .addCase(loadOffersSuccess, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
      state.offersLoading = false;
    })
    .addCase(loadOffersFailure, (state, action) => {
      const {error} = action.payload;
      state.offersLoading = false;
      state.errorLoadOffers = error;
    })
    .addCase(loadOfferByIdRequest, (state, action) => {
      state.offerByIdLoading = StatusLoading.Loading;
    })
    .addCase(loadOfferByIdSuccess, (state, action) => {
      const {offer} = action.payload;
      state.offerById = offer;
      state.offerByIdLoading = StatusLoading.Succeeded;
    })
    .addCase(loadOfferByIdFailure, (state, action) => {
      const {error} = action.payload;
      state.offerByIdLoading = StatusLoading.Failed;
      state.errorLoadOfferById = error;
    })
    .addCase(loadOffersNearbyRequest, (state, action) => {
      state.offersNearbyLoading = true;
    })
    .addCase(loadOffersNearbySuccess, (state, action) => {
      const {offers} = action.payload;
      state.offersNearby = offers;
      state.offersNearbyLoading = false;
    })
    .addCase(loadOffersNearbyFailure, (state, action) => {
      const {error} = action.payload;
      state.offersNearbyLoading = false;
      state.errorLoadOffersNearby = error;
    })
    .addCase(loadOfferCommentsRequest, (state, action) => {
      state.offerCommentsLoading = true;
    })
    .addCase(loadOfferCommentsSuccess, (state, action) => {
      const {comments} = action.payload;
      state.offerComments = comments;
      state.offerCommentsLoading = false;
    })
    .addCase(loadOfferCommentsFailure, (state, action) => {
      const {error} = action.payload;
      state.offerCommentsLoading = false;
      state.errorLoadOfferComments = error;
    })
    .addCase(postOfferCommentRequest, (state, action) => {
      state.commentLoading = true;
    })
    .addCase(postOfferCommentSuccess, (state, action) => {
      const {comments} = action.payload;
      state.offerComments = comments;
      state.commentLoading = false;
      state.isClearCommentForm = true;
    })
    .addCase(postOfferCommentFailure, (state, action) => {
      const {error} = action.payload;
      state.commentLoading = false;
      state.errorPostOfferComment = error;
    })
    .addCase(clearCommentForm, (state) => {
      state.isClearCommentForm = false;
    })
    .addCase(fetchFavoriteRequest, (state, action) => {
      state.fetchFavoriteLoading = true;
    })
    .addCase(fetchFavoriteSuccess, (state, action) => {
      const {offers} = action.payload;
      state.favoriteOffers = offers;
      state.fetchFavoriteLoading = false;
    })
    .addCase(fetchFavoriteFailure, (state, action) => {
      const {error} = action.payload;
      state.fetchFavoriteLoading = false;
      state.errorFetchFavorite = error;
    })
    .addCase(postFavoriteRequest, (state) => {
      state.favoriteLoading = true;
    })
    .addCase(postFavoriteSuccess, (state, action) => {
      const {id, status} = action.payload;
      state.favoriteLoading = false;
      const favoriteOfferMainPage = state.offers
        .find((offer) => offer.id === id);
      if (favoriteOfferMainPage) {
        favoriteOfferMainPage.isFavorite = status;
      }
      if (state.offerById && state.offerById.id === id) {
        state.offerById.isFavorite = status;
      }
      const favoriteOfferIndex = state.favoriteOffers
        .findIndex((offer) => offer.id === id);
      if (favoriteOfferIndex !== -1) {
        state.favoriteOffers.splice(favoriteOfferIndex, 1);
      }
    })
    .addCase(postFavoriteFailure, (state, action) => {
      const {error} = action.payload;
      state.favoriteLoading = false;
      state.errorPostFavorite = error;
    });
});

export {appData};
