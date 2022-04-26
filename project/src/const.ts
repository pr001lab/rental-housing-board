import {offerSortType, offerType, valueRatingType} from './types/const';

export const FIRST_CITY_TAB = 'Paris';
export const SORT_TYPE_DEFAULT = 'Popular';

export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum StatusLoading {
  Idle = 'idle',
  Loading = 'loading',
  Succeeded = 'succeeded',
  Failed = 'failed',
}

export enum AppRoutes {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum APIRoutes {
  Hotels = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Comments = '/comments',
  Favorite = '/favorite',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const offerTypes: offerType = {
  apartment: 'Apartment',
  room: 'Room',
  house: 'House',
  hotel: 'Hotel',
};

export const valueRatings: valueRatingType = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly',
};

export const offerSortTypes: offerSortType = {
  POPULAR: 'Popular',
  PRICE_DOWN: 'Price: low to high',
  PRICE_UP: 'Price: high to low',
  RATING_DOWN: 'Top rated first',
};

export enum ErrorTexts {
FETCH_OFFER_BY_ID_FAIL_MESSAGE = 'Не удалось получить данные. Попробуйте попозже',
FETCH_NEARBY_OFFER_FAIL_MESSAGE = 'Не удалось получить данные. Попробуйте попозже',
FETCH_REVIEW_FAIL_MESSAGE = 'Не удалось получить комментарии. Попробуйте попозже',
POST_REVIEW_FAIL_MESSAGE = 'Не удалось отправить комментарий. Попробуйте попозже',
FETCH_FAVORITE_MESSAGE = 'Не удалось получить данные. Попробуйте попозже',
POST_FAVORITE_MESSAGE = 'Не удалось отправить данные. Попробуйте попозже',
LOGIN_FAIL_MESSAGE = 'Не удалось залогиниться. Попробуйте попозже',
}
