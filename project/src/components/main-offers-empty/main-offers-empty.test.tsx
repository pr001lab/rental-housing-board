import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import MainOffersEmpty from './main-offers-empty';
import {FIRST_CITY_TAB} from '../../const';

describe('Component: MainOffersEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <MainOffersEmpty
          currentCity={FIRST_CITY_TAB}
        />
      </Router>,
    );

    expect(
      screen
        .getByText(/We could not find any property available at the moment/i))
      .toBeInTheDocument();
  });
});
