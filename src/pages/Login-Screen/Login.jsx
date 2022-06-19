import React, { useState } from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import Input from './Input';
import { useAuth } from '../../context';

function Login({ history }) {
  const [loginValidated, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const { email, handleEmail } = useAuth();
  // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

  function emailValidated() {
    const re = /\S+@\S+\.\S+/;
    const valid = re.test(email);
    return valid;
  }

  function passwordValidated() {
    const minimum = 6;
    if (password.length >= minimum) {
      setValid(true);
    }
  }
  function saveStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }
  return (
    <div className="login">
      <fieldset>
        <Input
          type="text"
          id="email-input"
          name="email"
          placeholder="email"
          value={ email }
          onChange={ ({ target }) => {
            handleEmail(target.value);
            passwordValidated();
          } }
        />
        <Input
          type="password"
          id="password-input"
          name="password"
          placeholder="password"
          value={ password }
          onChange={ ({ target }) => {
            setPassword(target.value);
            passwordValidated();
          } }
        />
        <button
          onClick={ () => saveStorage() }
          type="button"
          data-testid="login-submit-btn"
          disabled={ !loginValidated || !emailValidated() }
        >
          Entrar
        </button>
      </fieldset>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
