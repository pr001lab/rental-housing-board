import {renderHook} from '@testing-library/react-hooks';
import useMap from './useMap';
import {mockOffer} from '../../utils/mocks';

describe('Hook: useMap', () => {
  it('should return array with 2 elements', () => {
    const mapRef = {current: document.createElement('div')};
    const {city} = mockOffer;
    const {result} = renderHook(() =>
      useMap(mapRef, city),
    );

    const map = result.current;

    expect(map).toBeInstanceOf(Object);
  });
});
