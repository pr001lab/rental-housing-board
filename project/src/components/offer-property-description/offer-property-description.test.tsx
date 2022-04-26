import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {adaptToClient} from '../../store/data/api-actions';
import {mockOffer} from '../../utils/mocks';
import OfferPropertyDescription from './offer-property-description';

const history = createMemoryHistory();

describe('Component: OfferPropertyDescription', () => {
  const text = adaptToClient(mockOffer).description;

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <OfferPropertyDescription text={text} />
      </Router>,
    );

    screen.getByTestId('propertyText').classList.contains('property__text');
  });

});
