import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const getUserApi = async () => {
      setLoading(true);
      const data = await getUser();
      setUserData(data);
      setLoading(false);
      console.log(data);
    };
    getUserApi();
  }, []);

  return (
    <div data-testid="page-profile">
      <Header />
      {
        loading
          ? <h2>Carregando...</h2> : (
            <form>

              <img data-testid="profile-image" id="img" src={ userData.image } alt="" />

              <label htmlFor="name">
                Nome
                <h2 id="name">{userData.name}</h2>
              </label>
              <label htmlFor="email">
                E-mail
                <h2 id="email">{userData.email}</h2>
              </label>

              <p>{userData.description}</p>

              <Link to="/profile/edit">Editar perfil</Link>

            </form>
          )
      }
    </div>
  );
}

export default Profile;
