import {Router} from 'react-router-dom';
import {screen, render} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';
import OfferHost from './offer-host';

const history = createMemoryHistory();

describe('Component: OfferHost', () => {
  it('should render correctly', () => {
    const mockDescription = adaptToClient(mockOffer).description;
    const mockHost = adaptToClient(mockOffer).host;

    render(
      <Router history={history}>
        <OfferHost
          host={mockHost}
          description={mockDescription}
        />
      </Router>,
    );

    expect(screen.getByText(/Meet the host/i)).toBeInTheDocument();
  });
});
