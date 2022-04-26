import {toast} from 'react-toastify';
import {
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
import {OfferType, OfferAdaptedType} from '../../types/offer';
import {APIRoutes, ErrorTexts} from '../../const';
import {ThunkActionResult} from '../../types/action';
import {CommentAdaptedType, CommentData, CommentType} from '../../types/comment';

export const adaptArrayToClient = (data: OfferAdaptedType[]): OfferType[] => (
  data.map((offer: OfferAdaptedType) => adaptToClient(offer))
);

export const adaptToClient = (offer: OfferAdaptedType): OfferType => {
  const {
    'is_favorite': del1,
    'is_premium': del2,
    'max_adults': del3,
    'preview_image': del4,
    ...adaptedOffer
  } = {
    ...offer,
    host: {
      ...offer.host,
      isPro: offer.host['is_pro'],
      avatarUrl: offer.host['avatar_url'],
    },
    isFavorite: offer['is_favorite'],
    isPremium: offer['is_premium'],
    maxAdults: offer['max_adults'],
    previewImage: offer['preview_image'],
  };

  delete adaptedOffer.host['avatar_url'];
  delete adaptedOffer.host['is_pro'];

  return adaptedOffer;
};

export const adaptCommentsToClient = (data: CommentAdaptedType[]): CommentType[] => (
  data
    .map(
      (offerComment: CommentAdaptedType) => adaptCommentToClient(offerComment),
    )
);

const adaptCommentToClient = (offerComment: CommentAdaptedType) => {
  const adaptedOfferComment = {
    ...offerComment,
    user: {
      ...offerComment.user,
      isPro: offerComment.user['is_pro'],
      avatarUrl: offerComment.user['avatar_url'],
    },
  };

  delete adaptedOfferComment.user['avatar_url'];
  delete adaptedOfferComment.user['is_pro'];

  return adaptedOfferComment;
};

export const fetchOffersAction = (): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadOffersRequest());
    try {
      const {data} = await api.get(APIRoutes.Hotels);
      dispatch(loadOffersSuccess(adaptArrayToClient(data)));
    } catch (error: any) {
      dispatch(loadOffersFailure(error.response.status));
    }
  }
);

export const fetchOfferByIdAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadOfferByIdRequest());
    try {
      const {data} = await api.get(`${APIRoutes.Hotels}/${id}`);
      dispatch(loadOfferByIdSuccess(adaptToClient(data)));
    } catch (error: any) {
      dispatch(loadOfferByIdFailure(error.response.status));
      if (error.response.status !== 404) {
        toast.warn(ErrorTexts.FETCH_OFFER_BY_ID_FAIL_MESSAGE);
      }
    }
  }
);

export const fetchNearbyOffersAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadOffersNearbyRequest());
    try {
      const {data} = await api.get(
        `${APIRoutes.Hotels}/${id}${APIRoutes.Nearby}`,
      );
      dispatch(loadOffersNearbySuccess(adaptArrayToClient(data)));
    } catch (error: any) {
      dispatch(loadOffersNearbyFailure(error.toString()));
      toast.warn(ErrorTexts.FETCH_NEARBY_OFFER_FAIL_MESSAGE);
    }
  }
);

export const fetchOfferCommentsAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(loadOfferCommentsRequest());
    try {
      const {data} = await api.get(`${APIRoutes.Comments}/${id}`);
      dispatch(loadOfferCommentsSuccess(adaptCommentsToClient(data)));
    } catch (error: any) {
      dispatch(loadOfferCommentsFailure(error.toString()));
      toast.warn(ErrorTexts.FETCH_REVIEW_FAIL_MESSAGE);
    }
  }
);

export const commentAction = (
  {id, rating, comment}: CommentData,
): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(postOfferCommentRequest());
    try {
      const {data} = await api.post(
        `${APIRoutes.Comments}/${id}`,
        {rating, comment},
      );
      dispatch(postOfferCommentSuccess(adaptCommentsToClient(data)));
    } catch (error: any) {
      dispatch(postOfferCommentFailure(error.toString()));
      toast.warn(ErrorTexts.POST_REVIEW_FAIL_MESSAGE);
    }
  }
);

export const fetchFavoritesAction = (): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(fetchFavoriteRequest());
    try {
      const {data} = await api.get(APIRoutes.Favorite);
      dispatch(fetchFavoriteSuccess(adaptArrayToClient(data)));
    } catch (error: any) {
      dispatch(fetchFavoriteFailure(error.toString()));
      toast.warn(ErrorTexts.FETCH_FAVORITE_MESSAGE);
    }
  }
);

export const favoriteAction = (id: number, status: boolean): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(postFavoriteRequest());
    try {
      await api.post(
        `${APIRoutes.Favorite}/${id}/${Number(status)}`);
      dispatch(postFavoriteSuccess(id, status));
    } catch (error: any) {
      dispatch(postFavoriteFailure(error.toString()));
      toast.warn(ErrorTexts.POST_FAVORITE_MESSAGE);
    }
  }
);
