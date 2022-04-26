import {cities, StatusLoading} from '../../const';
import {
  makeFakeTitle,
  mockComment,
  mockFavoriteOffer,
  mockOffer
} from '../../utils/mocks';
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
import {adaptArrayToClient, adaptToClient} from './api-actions';
import {appData, DataType} from './data';


describe('Reducer: data', () => {
  let state: DataType = {
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
  beforeEach(() => {
    state = {
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
  });

  it('without additional parameters should return initial state', () => {
    expect(appData(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  it('offers: should update status of loading', () => {
    expect(appData(state, loadOffersRequest()))
      .toEqual({
        ...state,
        offersLoading: true,
      });
  });

  it('offers: should update offers and status of loading', () => {
    expect(appData(state, loadOffersSuccess(adaptArrayToClient([mockOffer]))))
      .toEqual({
        ...state,
        offers: adaptArrayToClient([mockOffer]),
        offersLoading: false,
      });
  });

  it('offers: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, loadOffersFailure(error)))
      .toEqual({
        ...state,
        offersLoading: false,
        errorLoadOffers: error,
      });
  });

  it('offerById: should update status of loading', () => {
    expect(appData(state, loadOfferByIdRequest()))
      .toEqual({
        ...state,
        offerByIdLoading: StatusLoading.Loading,
      });
  });

  it('offerById: should update offerByID and status of loading', () => {
    expect(appData(state, loadOfferByIdSuccess(adaptToClient(mockOffer))))
      .toEqual({
        ...state,
        offerById: adaptToClient(mockOffer),
        offerByIdLoading: StatusLoading.Succeeded,
      });
  });

  it('offerById: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, loadOfferByIdFailure(error)))
      .toEqual({
        ...state,
        offerByIdLoading: StatusLoading.Failed,
        errorLoadOfferById: error,
      });
  });

  it('offersNearby: should update status of loading', () => {
    expect(appData(state, loadOffersNearbyRequest()))
      .toEqual({
        ...state,
        offersNearbyLoading: true,
      });
  });

  it('offersNearby: should update offersNearby and status of loading', () => {
    expect(appData(state, loadOffersNearbySuccess(adaptArrayToClient([mockOffer]))))
      .toEqual({
        ...state,
        offersNearby: adaptArrayToClient([mockOffer]),
        offersNearbyLoading: false,
      });
  });

  it('offersNearby: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, loadOffersNearbyFailure(error)))
      .toEqual({
        ...state,
        offersNearbyLoading: false,
        errorLoadOffersNearby: error,
      });
  });

  it('offerComments: should update status of loading', () => {
    expect(appData(state, loadOfferCommentsRequest()))
      .toEqual({
        ...state,
        offerCommentsLoading: true,
      });
  });

  it('offerComments: should update offerComments and status of loading', () => {
    expect(appData(state, loadOfferCommentsSuccess([mockComment])))
      .toEqual({
        ...state,
        offerComments: [mockComment],
        offerCommentsLoading: false,
      });
  });

  it('offerComments: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, loadOfferCommentsFailure(error)))
      .toEqual({
        ...state,
        offerCommentsLoading: false,
        errorLoadOfferComments: error,
      });
  });

  it('offerComment: should update status of loading', () => {
    expect(appData(state, postOfferCommentRequest()))
      .toEqual({
        ...state,
        commentLoading: true,
      });
  });

  it('offerComment: should update offerComment and status of loading', () => {
    expect(appData(state, postOfferCommentSuccess([mockComment])))
      .toEqual({
        ...state,
        offerComments: [mockComment],
        offerCommentsLoading: false,
        isClearCommentForm: true,
      });
  });

  it('offerComment: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, postOfferCommentFailure(error)))
      .toEqual({
        ...state,
        commentLoading: false,
        errorPostOfferComment: error,
      });
  });

  it('offerComment: should update status of clear form', () => {
    expect(appData(state, clearCommentForm()))
      .toEqual({
        ...state,
        isClearCommentForm: false,
      });
  });

  it('fetchFavorite: should update status of loading', () => {
    expect(appData(state, fetchFavoriteRequest()))
      .toEqual({
        ...state,
        fetchFavoriteLoading: true,
      });
  });

  it('fetchFavorite: should update favorite and status of loading', () => {
    expect(appData(state, fetchFavoriteSuccess(adaptArrayToClient([mockOffer]))))
      .toEqual({
        ...state,
        favoriteOffers: adaptArrayToClient([mockOffer]),
        fetchFavoriteLoading: false,
      });
  });

  it('fetchFavorite: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, fetchFavoriteFailure(error)))
      .toEqual({
        ...state,
        fetchFavoriteLoading: false,
        errorFetchFavorite: error,
      });
  });

  it('postFavorite: should update status of loading', () => {
    expect(appData(state, postFavoriteRequest()))
      .toEqual({
        ...state,
        favoriteLoading: true,
      });
  });

  it('postFavorite: should update status favorite in offers and status of loading', () => {

    state.offers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(11, true)))
      .toEqual({
        ...state,
        offers: adaptArrayToClient([mockFavoriteOffer]),
        favoriteLoading: false,
      });
  });

  it('postFavorite: shouldn\'t update status favorite in offers when id is incorrect', () => {

    state.offers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(12, true)))
      .not.toEqual({
        ...state,
        offers: adaptArrayToClient([mockFavoriteOffer]),
      });
  });

  it('postFavorite: shouldn\'t update status favorite in offers when status is false', () => {

    state.offers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(12, false)))
      .not.toEqual({
        ...state,
        offers: adaptArrayToClient([mockFavoriteOffer]),
      });
  });

  it('postFavorite: should update status favorite in offerById', () => {

    state.offerById = adaptToClient(mockOffer);

    expect(appData(state, postFavoriteSuccess(11, true)))
      .toEqual({
        ...state,
        offerById: adaptToClient(mockFavoriteOffer),
      });
  });

  it('postFavorite: shouldn\'t update status favorite in offerById when id is incorrect', () => {

    state.offerById = adaptToClient(mockOffer);

    expect(appData(state, postFavoriteSuccess(12, true)))
      .not.toEqual({
        ...state,
        offerById: adaptToClient(mockFavoriteOffer),
      });
  });

  it('postFavorite: shouldn\'t update status favorite in offerById when status is false', () => {

    state.offerById = adaptToClient(mockOffer);

    expect(appData(state, postFavoriteSuccess(12, false)))
      .not.toEqual({
        ...state,
        offerById: adaptToClient(mockFavoriteOffer),
      });
  });

  it('postFavorite: shouldn\'t remove offer from favoriteOffers', () => {

    state.favoriteOffers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(11, true)))
      .toEqual({
        ...state,
        favoriteOffers: [],
      });
  });

  it('postFavorite: don\'t remove offer from favoriteOffers when id is incorrect', () => {

    state.favoriteOffers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(12, true)))
      .not.toEqual({
        ...state,
        favoriteOffers: [],
      });
  });

  it('postFavorite: don\'t remove offer from favoriteOffers when status is false', () => {

    state.favoriteOffers = adaptArrayToClient([mockOffer]);

    expect(appData(state, postFavoriteSuccess(12, false)))
      .not.toEqual({
        ...state,
        favoriteOffers: [],
      });
  });

  it('postFavorite: should update error and status of loading', () => {
    const error = makeFakeTitle();

    expect(appData(state, postFavoriteFailure(error)))
      .toEqual({
        ...state,
        errorPostFavorite: error,
      });
  });

});
