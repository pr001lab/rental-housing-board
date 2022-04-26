import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import OfferImage from './offer-image';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';

const history = createMemoryHistory();

describe('Component: OfferImage', () => {
  const images = (adaptToClient(mockOffer).images);

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <OfferImage images={images}/>
      </Router>,
    );

    screen.getByTestId('galleryContainer')
      .classList.contains('property__gallery-container container');
  });

});
