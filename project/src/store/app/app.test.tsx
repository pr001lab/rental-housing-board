import {FIRST_CITY_TAB, SORT_TYPE_DEFAULT} from '../../const';
import {makeFakeTitle, mockOffer} from '../../utils/mocks';
import {adaptToClient} from '../data/api-actions';
import {changeCity, changeSort, selectCurrentOffer} from './actions';
import {appProcess} from './app';

describe('Reducer: app', () => {
  it('without additional parameters should return initial state', () => {
    expect(appProcess(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        currentCity: FIRST_CITY_TAB,
        selectedOffer: null,
        selectedSort: SORT_TYPE_DEFAULT,
      });
  });

  it('should change name of city', () => {
    const state = {
      currentCity: FIRST_CITY_TAB,
      selectedOffer: null,
      selectedSort: SORT_TYPE_DEFAULT,
    };

    const currentCity = makeFakeTitle();

    expect(appProcess(state, changeCity(currentCity)))
      .toEqual({
        currentCity,
        selectedOffer: null,
        selectedSort: SORT_TYPE_DEFAULT,
      });
  });

  it('should change selected offer', () => {
    const state = {
      currentCity: FIRST_CITY_TAB,
      selectedOffer: null,
      selectedSort: SORT_TYPE_DEFAULT,
    };

    expect(appProcess(state, selectCurrentOffer(adaptToClient(mockOffer))))
      .toEqual({
        currentCity: FIRST_CITY_TAB,
        selectedOffer: adaptToClient(mockOffer),
        selectedSort: SORT_TYPE_DEFAULT,
      });
  });

  it('should change type of sort', () => {
    const state = {
      currentCity: FIRST_CITY_TAB,
      selectedOffer: null,
      selectedSort: SORT_TYPE_DEFAULT,
    };

    const currentSortType = makeFakeTitle();

    expect(appProcess(state, changeSort(currentSortType)))
      .toEqual({
        currentCity: FIRST_CITY_TAB,
        selectedOffer: null,
        selectedSort: currentSortType,
      });
  });
});
