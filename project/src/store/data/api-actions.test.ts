import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import {State} from '../../types/state';
import {APIRoutes} from '../../const';
import {
  adaptArrayToClient,
  adaptToClient,
  adaptCommentsToClient,
  fetchNearbyOffersAction,
  fetchOfferByIdAction,
  fetchOfferCommentsAction,
  fetchOffersAction,
  commentAction,
  fetchFavoritesAction,
  favoriteAction
} from './api-actions';
import {
  mockComment,
  mockFavoriteOffer,
  mockOffer
} from '../../utils/mocks';
import {
  fetchFavoriteRequest,
  fetchFavoriteSuccess,
  loadOfferByIdRequest,
  loadOfferByIdSuccess,
  loadOfferCommentsRequest,
  loadOfferCommentsSuccess,
  loadOffersNearbyRequest,
  loadOffersNearbySuccess,
  loadOffersRequest,
  loadOffersSuccess,
  postFavoriteRequest,
  postFavoriteSuccess,
  postOfferCommentRequest,
  postOfferCommentSuccess
} from '../data/actions';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchOffers when GET /offers', async () => {
    const mockOffers = [mockOffer];
    mockAPI
      .onGet(APIRoutes.Hotels)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      loadOffersRequest(),
      loadOffersSuccess(adaptArrayToClient(mockOffers)),
    ]);
  });

  it('should dispatch fetchOfferById when GET /offers/id', async () => {
    const mockOfferById = mockOffer;
    mockAPI
      .onGet(`${APIRoutes.Hotels}/${mockOfferById.id}`)
      .reply(200, mockOfferById);

    const store = mockStore();
    await store.dispatch(fetchOfferByIdAction(String(mockOfferById.id)));

    expect(store.getActions()).toEqual([
      loadOfferByIdRequest(),
      loadOfferByIdSuccess(adaptToClient(mockOfferById)),
    ]);
  });

  it('should dispatch fetchNearbyOffers when GET /offers/id/nearby', async () => {
    const mockOfferById = mockOffer;
    const mockOffers = [mockOffer];
    mockAPI
      .onGet(`${APIRoutes.Hotels}/${mockOfferById.id}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();
    await store.dispatch(fetchNearbyOffersAction(String(mockOfferById.id)));

    expect(store.getActions()).toEqual([
      loadOffersNearbyRequest(),
      loadOffersNearbySuccess(adaptArrayToClient(mockOffers)),
    ]);
  });

  it('should dispatch fetchOfferComments when GET /comments/id', async () => {
    const mockOfferById = mockOffer;
    const mockComments = [mockComment];
    mockAPI
      .onGet(`${APIRoutes.Comments}/${mockOfferById.id}`)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchOfferCommentsAction(String(mockOfferById.id)));

    expect(store.getActions()).toEqual([
      loadOfferCommentsRequest(),
      loadOfferCommentsSuccess(adaptCommentsToClient(mockComments)),
    ]);
  });

  it('should dispatch comment when POST /comments/id', async () => {
    const mockOfferById = mockOffer;
    mockAPI
      .onPost(`${APIRoutes.Comments}/${mockOfferById.id}`)
      .reply(200, [mockComment]);

    const store = mockStore();
    await store.dispatch(commentAction({
      id: String(mockOfferById.id),
      rating: '5',
      comment: mockComment.comment,
    }));

    expect(store.getActions()).toEqual([
      postOfferCommentRequest(),
      postOfferCommentSuccess(adaptCommentsToClient([mockComment])),
    ]);
  });

  it('should dispatch fetchFavorites when GET /favorite', async () => {
    const mockFavoriteOffers = [mockFavoriteOffer];
    mockAPI
      .onGet(APIRoutes.Favorite)
      .reply(200, mockFavoriteOffers);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());

    expect(store.getActions()).toEqual([
      fetchFavoriteRequest(),
      fetchFavoriteSuccess(adaptArrayToClient(mockFavoriteOffers)),
    ]);
  });

  it('should dispatch favorite when POST /favorite/id/status', async () => {
    const mockOfferById = mockOffer;
    const statusFavorite = true;
    mockAPI
      .onPost(`${APIRoutes.Favorite}/${mockOfferById.id}/${Number(statusFavorite)}`)
      .reply(200, mockOfferById);

    const store = mockStore();
    await store.dispatch(favoriteAction(mockOfferById.id, statusFavorite));

    expect(store.getActions()).toEqual([
      postFavoriteRequest(),
      postFavoriteSuccess(mockOfferById.id, statusFavorite),
    ]);
  });

});
