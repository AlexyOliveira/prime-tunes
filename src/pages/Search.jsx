import React, { useState } from 'react';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import SongCards from '../components/SongCards';
import './Search.css';

function Search() {
  const [searchInput, setsearchInput] = useState('');
  const [saveSearch, setSaveSearch] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchLengthMin = 2;

  const handleChange = ({ target }) => {
    setsearchInput(target.value);
  };

  const handleClick = async () => {
    setSaveSearch(searchInput);
    setsearchInput('');
    setLoading(true);
    const songsResponse = await searchAlbumsAPI(searchInput);
    setLoading(false);
    setSongs(songsResponse);
  };

  return (
    <>
      <Header />
      <div className="search-container" data-testid="page-search">

        <form>
          <input
            value={ searchInput }
            onChange={ handleChange }
            data-testid="search-artist-input"
            type="text"
          />
          <button
            onClick={ handleClick }
            disabled={ searchInput.length < searchLengthMin }
            data-testid="search-artist-button"
            type="button"
          >
            Pesquisar
          </button>
        </form>
        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <div>
            {songs.length > 0 ? (
              <>
                <span>{`Resultado de álbuns de: ${saveSearch} `}</span>
                <SongCards songs={ songs } />
              </>
            ) : (
              <h1>Nenhum álbum foi encontrado</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Search;
