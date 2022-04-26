import {Router} from 'react-router-dom';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import StarRating from './star-rating';
import {valueRatings} from '../../const';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

describe('Component: StarRating', () => {
  it('should render correctly', () => {
    const mockKey = '5';
    const mockStarActionNumber = '0';

    render(
      <Router history={history}>
        <StarRating
          title={valueRatings[mockKey]}
          starNumber={mockKey}
          starActionNumber={mockStarActionNumber}
          onChangeRating={jest.fn()}
        />
      </Router>,
    );

    screen.getByRole('radio').classList.contains('form__rating-input');
    expect(screen.getByRole('radio')).toBeInTheDocument();
    expect(screen.getByRole('radio')).not.toBeChecked();
  });

  it('should called onChange when user choose star-rating', () => {
    const mockKey = '1';
    const mockStarActionNumber = '0';
    const onChangeRating = jest.fn();

    render(
      <Router history={history}>
        <StarRating
          title={valueRatings[mockKey]}
          starNumber={mockKey}
          starActionNumber={mockStarActionNumber}
          onChangeRating={onChangeRating}
        />
      </Router>,
    );

    expect(screen.getByRole('radio')).not.toBeChecked();

    userEvent.click(screen.getByRole('radio'));
    expect(onChangeRating).toBeCalled();
  });
});
