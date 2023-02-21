import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';

function Favorites() {
  const [loading] = useState(false);
  const favorites = useSelector((state) => state.favoriteSongsReducer.favorites);

  return (
    <div data-testid="page-favorites">
      <Header />
      {
        loading ? <h2>Carregando...</h2> : <MusicCard tracks={ favorites } />
      }

    </div>
  );
}

export default Favorites;
