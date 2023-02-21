import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

function ProfileEdit() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [isDisabled, setIsdIsabled] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const getUserApi = async () => {
      setLoading(true);
      const data = await getUser();
      setUser(data);
      setLoading(false);
    };
    getUserApi();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    const { name, email, description, image } = user;
    const items = [name, email, description, image];

    const verifyLength = items.some((item) => item === '');
    const inputsLengthVerify = () => {
      if (!verifyLength) {
        setIsdIsabled(false);
      } else {
        setIsdIsabled(true);
      }
    };
    inputsLengthVerify();
  }, [user]);

  const handleClick = () => {
    const { name, email, image, description } = user;
    updateUser({
      name,
      email,
      image,
      description,
    });

    history.push('/profile');
  };

  return (
    <div data-testid="page-profile-edit">
      <Header />
      {loading ? (
        <h1>Carregando...</h1>
      ) : (
        <form>
          <label htmlFor="image">
            <img src={ user.image } alt={ user.name } />
            <input
              type="url"
              id="image"
              data-testid="edit-input-image"
              value={ user.image }
              name="image"
              onChange={ handleChange }
              required
            />
          </label>
          <label htmlFor="name">
            Nome:
            <input
              onChange={ handleChange }
              type="text"
              data-testid="edit-input-name"
              id="name"
              name="name"
              value={ user.name }
            />
          </label>

          <label htmlFor="email">
            E-mail:
            <input
              onChange={ handleChange }
              type="email"
              data-testid="edit-input-email"
              id="email"
              name="email"
              value={ user.email }
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <textarea
              onChange={ handleChange }
              type="text"
              data-testid="edit-input-description"
              id="description"
              name="description"
              value={ user.description }
            />
          </label>

          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ isDisabled }
            onClick={ handleClick }
          >
            Salvar

          </button>
        </form>
      )}
    </div>
  );
}

export default ProfileEdit;
