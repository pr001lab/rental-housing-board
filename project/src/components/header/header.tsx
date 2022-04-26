import {useLocation} from 'react-router-dom';
import {AppRoutes, AuthorizationStatus} from '../../const';
import UserMenu from '../user-menu/user-menu';
import Logo from '../logo/logo';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function Header({authorizationStatus}: AppScreenProps): JSX.Element {
  const {pathname} = useLocation();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {
            pathname !== AppRoutes.Login && <UserMenu authorizationStatus={authorizationStatus}/>
          }
        </div>
      </div>
    </header>
  );
}

export default Header;
