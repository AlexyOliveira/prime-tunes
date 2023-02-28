import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { setIsPlay } from '../redux/actions';
import { getUser } from '../services/userAPI';
import './ProfileAndProfileEdit.css';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsPlay(false));
    const getUserApi = async () => {
      setLoading(true);
      const data = await getUser();
      setUserData(data);
      setLoading(false);
    };
    getUserApi();
  }, []);

  return (
    <div>
      <Header />
      <div className="profile-container" data-testid="page-profile">
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <form>
            <img
              data-testid="profile-image"
              id="img"
              src={ userData.image }
              alt=""
            />
            <div className="profile-info">
              <label htmlFor="name">
                <span className="nome-email-desc">
                  <strong>Nome</strong>
                  {' '}
                </span>
                <p id="name">{userData.name}</p>
              </label>
              <label htmlFor="email">
                <span className="nome-email-desc">
                  {' '}
                  <strong>E-mail</strong>
                  {' '}
                </span>
                <p id="email">{userData.email}</p>
              </label>
              <label htmlFor="desc">
                <span className="nome-email-desc">
                  {' '}
                  <strong>Descrição</strong>
                  {' '}
                </span>
                <div className="desc">{userData.description}</div>
              </label>

              <Link className="button btn btn-primary" to="/profile/edit">
                Editar perfil
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
