import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import './Login.css';
import loginLogo from '../images/login-logo.png';
import loadingGif from '../images/loading.gif';

function Login() {
  const [nameInput, setNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const nameLengthMin = 3;

  const handleName = ({ target }) => {
    setNameInput(target.value);
  };

  useEffect(() => {
    const btn = document.getElementById('login-btn');

    if (nameInput.length > 2) {
      btn.className = 'btn-able';
    } else if (nameInput.length < nameLengthMin) {
      btn.className = 'btn-disabled';
    }
  }, [nameInput]);

  const handleClick = async () => {
    setLoading(true);
    await createUser({ name: nameInput, image: 'https://i.pinimg.com/474x/76/4d/59/764d59d32f61f0f91dec8c442ab052c5.jpg' });
    setLoading(false);
    history.push('/search');
  };

  return (
    <div className="login-container" data-testid="page-login">
      {
        loading ? (
          <div className="loading-area">
            <img src={ loadingGif } alt="" />
            <h2>Carregando...</h2>

          </div>)
          : (
            <form className="login-form">
              <img className="login-logo" src={ loginLogo } alt="" />

              <input
                className="name-box"
                placeholder="qual é seu nome?"
                data-testid="login-name-input"
                onChange={ handleName }
                id="name"
                type="text"
                autoComplete="on"
              />

              <button
                id="login-btn"
                className="btn-disabled"
                data-testid="login-submit-button"
                disabled={ nameInput.length < nameLengthMin }
                onClick={ handleClick }
                type="submit"
              >
                Entrar
              </button>
            </form>
          )
      }

    </div>
  );
}

export default Login;
