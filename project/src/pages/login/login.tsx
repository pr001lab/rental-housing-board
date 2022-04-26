import {useMemo} from 'react';
import Header from '../../components/header/header';
import LoginSignIn from '../../components/sign-in/sign-in';
import {AuthorizationStatus} from '../../const';

type AppScreenProps = {
  authorizationStatus: AuthorizationStatus;
}

function Login({authorizationStatus}: AppScreenProps): JSX.Element {
  const memoHeader = useMemo(
    () => <Header authorizationStatus={authorizationStatus} />,
    [authorizationStatus],
  );

  return (
    <div
      className="page page--gray page--login"
      data-testid="pageLogin"
    >
      {memoHeader}
      <LoginSignIn />
    </div>
  );
}

export default Login;
