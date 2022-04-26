import {createSelector} from 'reselect';
import {StatusLoading} from '../../const';
import {CommentType} from '../../types/comment';
import {OfferType} from '../../types/offer';
import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';

export const selectCities = (state: State): string[] => (
  state[NameSpace.data].cities
);
export const selectOffers = (state: State): OfferType[] => (
  state[NameSpace.data].offers
);
export const selectOffersLoading = (state: State): boolean => (
  state[NameSpace.data].offersLoading
);
export const selectErrorLoadOffers = (state: State): string | null => (
  state[NameSpace.data].errorLoadOffers
);
export const selectOfferComments = (state: State): CommentType[] => (
  state[NameSpace.data].offerComments
);
export const selectErrorLoadOfferComments = (state: State): string | null => (
  state[NameSpace.data].errorLoadOfferComments
);
export const selectCommentLoading = (state: State): boolean => (
  state[NameSpace.data].commentLoading
);
export const selectIsClearCommentForm = (state: State): boolean => (
  state[NameSpace.data].isClearCommentForm
);
export const selectOfferByIdLoading = (state: State): StatusLoading => (
  state[NameSpace.data].offerByIdLoading
);
export const selectOfferById = (state: State): OfferType | null => (
  state[NameSpace.data].offerById
);
export const selectErrorLoadOfferById = (state: State): string | null => (
  state[NameSpace.data].errorLoadOfferById
);
export const selectOffersNearby = (state: State): OfferType[] => (
  state[NameSpace.data].offersNearby
);
export const selectFavoriteOffers = (state: State): OfferType[] => (
  state[NameSpace.data].favoriteOffers
);

export const selectOfferByIdCombo = createSelector(
  [selectOfferByIdLoading, selectOfferById, selectErrorLoadOfferById],
  (offerLoading, offer, offerError) => ({
    offerLoading,
    offer,
    offerError,
  }),
);
