import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {changeCity} from '../../store/app/actions';
import {selectCurrentCity} from '../../store/app/selectors';
import {selectCities} from '../../store/data/selectors';

function Filter(): JSX.Element {
  const currentCity = useSelector(selectCurrentCity);
  const dispatch = useDispatch();
  const cities = useSelector(selectCities);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => {
              const classNameActive = cn({
                'tabs__item--active': city === currentCity,
              });

              return (
                <li className="locations__item" key={city}>
                  <a href="/#"
                    className={ `locations__item-link tabs__item
                      ${classNameActive}` }
                    onClick={() => dispatch(changeCity(city))}
                  >
                    <span>{city}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Filter;
