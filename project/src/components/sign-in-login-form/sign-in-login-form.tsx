import {ChangeEvent, FormEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import cn from 'classnames';
import {loginAction} from '../../store/user/api-actions';
import {selectLoginLoading} from '../../store/user/selectors';
import styles from './sign-in.module.css';
import ButtonsLoader from '../buttons-loader/buttons-loader';

const fields = {
  email: 'E-mail',
  password: 'Password',
};

type FormStateType = {
  value: string,
  isValid: boolean,
  errorText: string,
  regex: RegExp,
  touched: boolean,
};

function SignInLoginForm(): JSX.Element {
  const [formState, setFormState] = useState<{[key: string]: FormStateType}>({
    email: {
      value: '',
      isValid: false,
      errorText: 'The login must be a valid email!',
      regex: /^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.+.[a-zA-Z]{2,4}$/,
      touched: false,
    },
    password: {
      value: '',
      isValid: false,
      errorText: 'The password must be at least 1 letter and a number!',
      regex: /([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})/,
      touched: false,
    },
  });

  const dispatch = useDispatch();
  const loginLoading = useSelector(selectLoginLoading);

  const handleInputOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    const rule = formState[name].regex;
    const isValid = rule.test(value);

    setFormState({
      ...formState,
      [name]: {
        ...formState[name],
        value,
        isValid: isValid,
        touched: true,
      },
    });
  };

  const handleFormOnSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(loginAction({
      login: formState.email.value,
      password: formState.password.value,
    }));
  };

  const buttonCls = cn('login__submit form__submit button', [styles.buttonRelative]);
  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" onSubmit={handleFormOnSubmit}>
        {Object.entries(fields).map(([name, label]) => {
          const field = formState[name];
          const inputCls = cn('login__input form__input',
            {[styles.error]: !field.isValid && field.touched});

          return (
            <div className="login__input-wrapper form__input-wrapper" key={name}>
              <label className="visually-hidden">{label}</label>
              {!field.isValid && field.touched && (
                <p className={styles.errorText}>
                  {field.errorText}
                </p>
              )}
              <input
                className={inputCls}
                type={name}
                name={name}
                placeholder={label}
                required
                value={field.value}
                onChange={handleInputOnChange}
                data-testid={`input${name}`}
              />
            </div>
          );},
        )}
        <button
          className={buttonCls}
          type="submit"
          disabled={!formState.email.isValid || !formState.password.isValid || loginLoading}
        >
          {
            loginLoading
              ?
              <>
                <span className={styles.loader}><ButtonsLoader /></span>
                <span className={styles.buttonText}>Loading...</span>
              </>
              : 'Sign in'
          }
        </button>
      </form>
    </section>
  );
}

export default SignInLoginForm;
