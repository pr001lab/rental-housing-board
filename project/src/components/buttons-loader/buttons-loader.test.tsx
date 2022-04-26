import {Router} from 'react-router-dom';
import {screen, render} from '@testing-library/react';
import ButtonsLoader from './buttons-loader';
import {createMemoryHistory} from 'history';

const history = createMemoryHistory();

describe('Component: ButtonsLoader', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <ButtonsLoader />
      </Router>,
    );

    expect(screen.getByTestId('buttonsLoader')).toBeInTheDocument();
  });
});
