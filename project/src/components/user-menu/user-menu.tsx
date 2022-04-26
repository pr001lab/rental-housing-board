import {AuthorizationStatus} from '../../const';
import UserMenuSignOut from '../user-menu-sign-out/user-menu-sign-out';
import UserMenuSignIn from '../user-menu-sign-in/user-menu-sign-in';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function UserMenu({authorizationStatus}: AppScreenProps): JSX.Element {

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Auth
          ? <UserMenuSignOut />
          : <UserMenuSignIn />}
      </ul>
    </nav>
  );
}

export default UserMenu;
