import cn from 'classnames';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {changeSort} from '../../store/app/actions';
import {offerSortTypes} from '../../const';
import {selectSelectedSort} from '../../store/app/selectors';

function OfferSort(): JSX.Element {
  const [isOpenSortList, setOpenSortList] = useState(false);
  const dispatch = useDispatch();
  const selectedSort = useSelector(selectSelectedSort);

  const ulClass = cn(
    'places__options places__options--custom',
    {
      'places__options--opened': isOpenSortList,
    },
  );

  const handleClickIconArrow = () => {
    setOpenSortList(!isOpenSortList);
  };

  const handleListItemClick = (sortType: string) => {
    setOpenSortList(!isOpenSortList);
    dispatch(changeSort(sortType));
  };

  return (
    <form
      className="places__sorting"
      action="#"
      method="get"
    >
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleClickIconArrow}
      >
      &nbsp;{selectedSort}&nbsp;
        <svg
          className="places__sorting-arrow"
          width="7"
          height="4"
        >
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul className={ulClass}>
        {Object.keys(offerSortTypes).map((key) => {
          const liActive = cn(
            'places__option',
            {
              'places__option--active': offerSortTypes[key] === selectedSort,
            });

          return (
            <li
              className={liActive}
              tabIndex={0}
              key={offerSortTypes[key]}
              onClick={() => handleListItemClick(offerSortTypes[key])}
            >
              {offerSortTypes[key]}
            </li>
          );
        })}
      </ul>
    </form>
  );
}

export default OfferSort;
