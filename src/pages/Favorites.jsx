import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import './Favorites.css';

function Favorites() {
  const [loading] = useState(false);
  const favorites = useSelector((state) => state.favoriteSongsReducer.favorites);
  const artWork = useSelector((state) => state.artWorkReducer.artWork);
  const name = useSelector((state) => state.artWorkReducer.name);
  const track = useSelector((state) => state.artWorkReducer.track);
  return (
    <div data-testid="page-favorites">
      <Header />
      <div className="fav main album-container">
        <div className="div-album">
          <img style={ { width: '170px', margin: '40px' } } src={ artWork } alt="" />
          <div className="fav-title">
            <h4>{name}</h4>
            <h5>{track}</h5>
            <h1>FAVORITA</h1>
          </div>
        </div>

        <div className="card-container">
          {
            loading ? <h2>Carregando...</h2> : <MusicCard tracks={ favorites } />
          }
        </div>
      </div>
    </div>
  );
}

export default Favorites;