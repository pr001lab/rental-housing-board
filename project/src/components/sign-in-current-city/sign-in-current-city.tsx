import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoutes, cities} from '../../const';
import {changeCity} from '../../store/app/actions';

const getRandomIntInclusive = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const MIN_INDEX_CITIES_ARRAY = 0;

function SignInCurrentCity(): JSX.Element {
  const dispatch = useDispatch();
  const getCitiesIndex = getRandomIntInclusive(
    MIN_INDEX_CITIES_ARRAY,
    cities.length - 1,
  );
  const currentCity = cities[getCitiesIndex];

  useEffect(() => {
    dispatch(changeCity(currentCity));
  });

  return (
    <section
      className="locations locations--login locations--current"
      data-testid="locationsLogin"
    >
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoutes.Main}>
          <span>{currentCity}</span>
        </Link>
      </div>
    </section>
  );
}

export default SignInCurrentCity;
