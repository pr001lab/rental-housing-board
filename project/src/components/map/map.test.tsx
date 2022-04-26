import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {screen, render} from '@testing-library/react';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Map from './map';
import {mockOffer} from '../../utils/mocks';
import {adaptToClient} from '../../store/data/api-actions';

const mockStore = configureMockStore();

const history = createMemoryHistory();

describe('Component: Map', () => {
  const store = mockStore({
    APP: {
      selectedOffer: adaptToClient(mockOffer),
    },
  });
  const offersList = [adaptToClient(mockOffer)];
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Map offersList={offersList}/>
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });

});
