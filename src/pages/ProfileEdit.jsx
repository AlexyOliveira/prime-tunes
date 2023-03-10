import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import SandButton from '../components/SandButton';
import { getUser, updateUser } from '../services/userAPI';
import loadingGif from '../images/loading.gif';
import './ProfileAndProfileEdit.css';

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
    <div>
      <Header />
      <div className="div-profile div-album">
        <SandButton />
      </div>
      <div className="ad profile-container" data-testid="page-profile-edit">
        {loading ? (
          <div className="loading-profile">
            <h1 className="loading-profile-h1">Carregando...</h1>
            <img src={ loadingGif } alt="loading" />
          </div>
        ) : (
          <form>

            <img className="profile-image" src={ user.image } alt={ user.name } />
            <span className="nome-email-desc-edit"><strong>URL</strong></span>

            <input
              className="image-edit"
              type="url"
              id="image"
              placeholder="cole o link da sua imagem aqui"
              data-testid="edit-input-image"
              value={ user.image }
              name="image"
              onChange={ handleChange }
              required
            />

            <div className="profile-info">
              <label htmlFor="name">
                <span className="nome-email-desc-edit">
                  {' '}
                  <span>Nome:</span>
                  <br />
                  {' '}
                </span>
                <input
                  className="input-edit"
                  onChange={ handleChange }
                  type="text"
                  data-testid="edit-input-name"
                  id="name"
                  name="name"
                  value={ user.name }
                />
              </label>

              <label htmlFor="email">
                <span className="nome-email-desc-edit">
                  <strong>E-mail:</strong>
                  <br />
                  {' '}
                </span>
                <input
                  className="input-edit"
                  onChange={ handleChange }
                  type="email"
                  data-testid="edit-input-email"
                  id="email"
                  name="email"
                  value={ user.email }
                />
              </label>
              <label htmlFor="description">
                <span className="nome-email-desc-edit">
                  <strong>Descri????o:</strong>
                  <br />
                  {' '}
                </span>
                <textarea
                  style={ { maxHeight: '200px', height: '200px' } }
                  className="input-edit"
                  onChange={ handleChange }
                  type="text"
                  data-testid="edit-input-description"
                  id="description"
                  name="description"
                  value={ user.description }
                />
              </label>

              <button
                className="button btn btn-primary"
                type="button"
                data-testid="edit-button-save"
                disabled={ isDisabled }
                onClick={ handleClick }
              >
                Salvar

              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileEdit;
