export type City = {
  location: {
    latitude: number,
    longitude: number,
    zoom: number,
  },
  name: string,
}

type Location = {
  latitude: number,
  longitude: number,
  zoom: number,
}

export type OfferType = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: User,
  id: number,
  images: string[],
  isFavorite: boolean,
  isPremium: boolean,
  location: Location,
  maxAdults: number,
  previewImage: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type OfferAdaptedType = {
  bedrooms: number,
  city: City,
  description: string,
  goods: string[],
  host: UserAdapted,
  id: number,
  images: string[],
  ['is_favorite']: boolean,
  ['is_premium']: boolean,
  location: Location,
  ['max_adults']: number,
  ['preview_image']: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

export type User = {
  avatarUrl?: string,
  email?: string,
  id: number,
  isPro?: boolean,
  name: string,
  token?: string,
}

export type UserAdapted = {
  ['avatar_url']?: string,
  email?: string,
  id: number,
  ['is_pro']?: boolean,
  name: string,
  token?: string,
}
