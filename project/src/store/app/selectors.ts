import {createSelector} from 'reselect';
import {OfferType} from '../../types/offer';
import {State} from '../../types/state';
import {NameSpace} from '../root-reducer';
import {selectOffers} from '../data/selectors';
import {makeOfferSortTypes} from '../../utils/utils';

export const selectCurrentCity = (state: State): string => (
  state[NameSpace.app].currentCity
);
export const selectSelectedOffer = (state: State): OfferType | null => (
  state[NameSpace.app].selectedOffer
);
export const selectSelectedSort = (state: State): string => (
  state[NameSpace.app].selectedSort
);

export const selectFilteredSortedOffers = createSelector(
  [selectOffers, selectCurrentCity, selectSelectedSort],
  (offers: OfferType[], city: string, sortType: string) => offers
    .filter((offer: OfferType) => offer.city.name === city)
    .sort(makeOfferSortTypes[sortType]),
);
