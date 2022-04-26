import {useMemo} from 'react';
import {Link} from 'react-router-dom';
import Header from '../../components/header/header';
import {AppRoutes, AuthorizationStatus} from '../../const';
import './not-found.css';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function NotFound({authorizationStatus}: AppScreenProps): JSX.Element {
  const memoHeader = useMemo(() => <Header authorizationStatus={authorizationStatus} />, [authorizationStatus]);

  return (
    <div className="page page--error">
      {memoHeader}
      <main className="page__main page__main--error error__not-found">
        <div className="page__error-container container">
          <section className="error">
            <div className="not-found__status-wrapper">
              <b className="not-found__status">404 Not Found.</b>
              <p className="not-found__status-description">
                <Link to={AppRoutes.Main}>Go to Main page</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href={AppRoutes.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </a>
      </footer>
    </div>
  );
}

export default NotFound;
