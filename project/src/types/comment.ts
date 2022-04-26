import {User, UserAdapted} from './offer';

export type CommentType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: User,
}

export type CommentData = {
  id: string,
  rating: string,
  comment: string,
}

export type CommentAdaptedType = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: UserAdapted,
}
