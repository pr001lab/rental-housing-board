import {offerSortTypes} from '../const';
import {OfferType} from '../types/offer';

export const computeRatingWidth = (rating: number): string => `${Math.round(rating) * 20}%`;

export const formatDateYYYYMMDD = (date: Date): string => {
  let dd = '00';
  let mm = '00';
  const d = date.getDate();
  dd = (d < 10) ? d.toString().padStart(2, '0') : d.toString();
  const m = date.getMonth() + 1;
  mm = (m < 10) ? m.toString().padStart(2, '0') : m.toString();
  const yyyy = date.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
};

export const formatDateMMMMYYYY = (date: Date): string => new Date(date).toLocaleString('en', {
  year: 'numeric',
  month: 'long',
});

export const makeOfferSortTypes = {
  [offerSortTypes.PRICE_UP]: (offerA: OfferType, offerB: OfferType): number =>
    offerB.price - offerA.price,

  [offerSortTypes.PRICE_DOWN]: (offerA: OfferType, offerB: OfferType): number =>
    offerA.price - offerB.price,

  [offerSortTypes.RATING_DOWN]: (offerA: OfferType, offerB: OfferType): number =>
    offerB.rating - offerA.rating,
};

export const getOffersFavoriteListBySities = (offersList: OfferType[]): {[key: string]: OfferType[]} => Array.from(offersList)
  .reduce((acc:{[key: string]: OfferType[]}, offer) => {
    if(!acc[offer.city.name] && offer.isFavorite) {
      acc[offer.city.name] = [];
    }

    if(offer.isFavorite){
      (acc[offer.city.name]).push(offer);
    }

    return acc;
  }, {});
