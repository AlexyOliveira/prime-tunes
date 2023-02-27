import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import './Header.css';
import logo from '../images/login-logo.png';
import loadingGif from '../images/loading.gif';

function Header() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const [userImg, setUserImg] = useState('');
  const nameMaxLength = 9;

  useEffect(() => {
    const fetchName = async () => {
      setLoading(true);
      const userResponse = await getUser();
      setUser(userResponse.name);
      setUserImg(userResponse.image);
      setLoading(false);
    };
    fetchName();
  }, []);

  const handleClose = () => {
    const header = document.getElementById('header');
    header.classList.remove('display-change');
  };

  return (
    <div id="header" className="header-component" data-testid="header-component">
      <div className="logo-div">
        <div onClick={ handleClose } className="header-close-btn btn">fechar</div>
        <NavLink to="/search">
          <img className="logo-header" src={ logo } alt="logo" />
        </NavLink>
      </div>
      <div>
        <nav>
          <NavLink
            activeClassName="active-link"
            className="link"
            data-testid="link-to-search"
            to="/search"
          >
            <i className="fa-solid fa-magnifying-glass" />
            Search
          </NavLink>
          <NavLink
            activeClassName="active-link"
            className="link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <i className="fa-regular fa-star" />
            Favorites
          </NavLink>
          <NavLink
            activeClassName="active-link"
            className="link"
            data-testid="link-to-profile"
            to="/profile"
          >
            <i className="fa-regular fa-address-card" />
            Profile
          </NavLink>
        </nav>
      </div>
      {loading ? (
        <div className="user-info">
          <img className="loading-header" src={ loadingGif } alt="loading" />
          <h2>Carregando...</h2>
        </div>
      ) : (
        <div className="user-info">
          <img src={ userImg } alt="" />
          <h3 title={ user } data-testid="header-user-name">
            {user.length > nameMaxLength
              ? `${user.slice(0, nameMaxLength)}...`
              : user}
          </h3>
        </div>
      )}
    </div>
  );
}

export default Header;
