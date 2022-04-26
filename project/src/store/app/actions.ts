import {createAction} from '@reduxjs/toolkit';
import {ActionType} from '../../types/action';
import {OfferType} from '../../types/offer';

export const changeCity = createAction(
  ActionType.ChangeCity, (city: string) => ({
    payload: {
      city,
    },
  }),
);

export const selectCurrentOffer = createAction(
  ActionType.SelectCurrentOffer, (offer: OfferType | null) => ({
    payload: {
      offer,
    },
  }),
);

export const changeSort = createAction(
  ActionType.ChangeSort, (sortType: string) => ({
    payload: {
      sortType,
    },
  }),
);
