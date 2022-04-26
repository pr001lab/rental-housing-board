import SignInCurrentCity from '../sign-in-current-city/sign-in-current-city';
import SignInLoginForm from '../sign-in-login-form/sign-in-login-form';

function SignIn(): JSX.Element {
  return (
    <main className="page__main page__main--login">
      <div
        className="page__login-container container"
        data-testid="pageLoginContainer"
      >
        <SignInLoginForm />
        <SignInCurrentCity />
      </div>
    </main>
  );
}

export default SignIn;
