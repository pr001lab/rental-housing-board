import {name} from 'faker';
import {CommentType} from '../types/comment';
import {OfferAdaptedType, UserAdapted} from '../types/offer';

export const makeFakeTitle = (): string => name.title();

export const mockUserData: UserAdapted = {
  'avatar_url': 'https://8.react.pages.academy/static/avatar/8.jpg',
  email: 'mock@mock.ru',
  id: 1,
  'is_pro': false,
  name: 'mock',
  token: 'secret',
};

export const mockComment: CommentType = {
  comment: 'Bathed in the nature. Completely unplugged. Unforgettable.',
  date: '2021-11-10T09:57:05.857Z',
  id: 1,
  rating: 3,
  user: {
    avatarUrl: 'https://8.react.pages.academy/static/avatar/10.jpg',
    id: 19,
    isPro: false,
    name: 'Christina',
  },
};

export const mockOffer: OfferAdaptedType = {
  bedrooms: 1,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  goods: ['Air conditioning', 'Breakfast', 'Washer', 'Towels', 'Baby seat', 'Laptop friendly workspace'],
  host: {
    id: 25,
    name: 'Angelina',
    'is_pro': true,
    'avatar_url': 'img/avatar-angelina.jpg',
  },
  id: 11,
  images: ['https://8.react.pages.academy/static/hotel/13.jpg', 'https://8.react.pages.academy/static/hotel/17.jpg', 'https://8.react.pages.academy/static/hotel/5.jpg', 'https://8.react.pages.academy/static/hotel/16.jpg', 'https://8.react.pages.academy/static/hotel/1.jpg', 'https://8.react.pages.academy/static/hotel/3.jpg', 'https://8.react.pages.academy/static/hotel/6.jpg', 'https://8.react.pages.academy/static/hotel/18.jpg', 'https://8.react.pages.academy/static/hotel/20.jpg', 'https://8.react.pages.academy/static/hotel/8.jpg', 'https://8.react.pages.academy/static/hotel/15.jpg', 'https://8.react.pages.academy/static/hotel/9.jpg', 'https://8.react.pages.academy/static/hotel/2.jpg', 'https://8.react.pages.academy/static/hotel/4.jpg'],
  'is_favorite': false,
  'is_premium': false,
  location: {
    latitude: 48.843610000000005,
    longitude: 2.338499,
    zoom: 16,
  },
  'max_adults': 2,
  'preview_image': 'https://8.react.pages.academy/static/hotel/3.jpg',
  price: 268,
  rating: 2.8,
  title: 'Waterfront with extraordinary view',
  type: 'room',
};

export const mockFavoriteOffer: OfferAdaptedType = {
  bedrooms: 1,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  description: 'Discover daily local life in city center, friendly neighborhood, clandestine casino, karaoke, old-style artisans, art gallery and artist studio downstairs.',
  goods: ['Air conditioning', 'Breakfast', 'Washer', 'Towels', 'Baby seat', 'Laptop friendly workspace'],
  host: {
    id: 25,
    name: 'Angelina',
    'is_pro': true,
    'avatar_url': 'img/avatar-angelina.jpg',
  },
  id: 11,
  images: ['https://8.react.pages.academy/static/hotel/13.jpg', 'https://8.react.pages.academy/static/hotel/17.jpg', 'https://8.react.pages.academy/static/hotel/5.jpg', 'https://8.react.pages.academy/static/hotel/16.jpg', 'https://8.react.pages.academy/static/hotel/1.jpg', 'https://8.react.pages.academy/static/hotel/3.jpg', 'https://8.react.pages.academy/static/hotel/6.jpg', 'https://8.react.pages.academy/static/hotel/18.jpg', 'https://8.react.pages.academy/static/hotel/20.jpg', 'https://8.react.pages.academy/static/hotel/8.jpg', 'https://8.react.pages.academy/static/hotel/15.jpg', 'https://8.react.pages.academy/static/hotel/9.jpg', 'https://8.react.pages.academy/static/hotel/2.jpg', 'https://8.react.pages.academy/static/hotel/4.jpg'],
  'is_favorite': true,
  'is_premium': false,
  location: {
    latitude: 48.843610000000005,
    longitude: 2.338499,
    zoom: 16,
  },
  'max_adults': 2,
  'preview_image': 'https://8.react.pages.academy/static/hotel/3.jpg',
  price: 268,
  rating: 2.8,
  title: 'Waterfront with extraordinary view',
  type: 'room',
};
