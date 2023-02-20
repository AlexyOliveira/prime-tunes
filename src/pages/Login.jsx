import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createUser } from '../services/userAPI';

function Login() {
  const [nameInput, setNameInput] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const nameLengthMin = 3;

  const handleName = ({ target }) => {
    setNameInput(target.value);
  };

  const handleClick = async () => {
    setLoading(true);
    await createUser({ name: nameInput });
    setLoading(false);
    history.push('/search');
  };

  return (
    <div data-testid="page-login">
      {
        loading ? <h2>Carregando...</h2> : (
          <form>
            <label htmlFor="name">
              Name:
              <input
                data-testid="login-name-input"
                onChange={ handleName }
                id="name"
                type="text"
              />
            </label>
            <button
              data-testid="login-submit-button"
              disabled={ nameInput.length < nameLengthMin }
              onClick={ handleClick }
              type="button"
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
