import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {AppRoutes} from '../../const';
import {fetchOffersAction} from '../../store/data/api-actions';
import {logoutAction} from '../../store/user/api-actions';
import {selectUserData} from '../../store/user/selectors';

function UserMenuSignOut(): JSX.Element {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  return (
    <>
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoutes.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">
            {userData?.email}
          </span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to={AppRoutes.Main}
          onClick={() => {
            dispatch(logoutAction());
            dispatch(fetchOffersAction());
          }}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </>
  );
}

export default UserMenuSignOut;
