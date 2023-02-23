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
    <div className="search-container" data-testid="page-search">
      <Header />

      <div className="main">
        <div className="div">
          <form>
            <input
              placeholder="NOME DO ARTISTA"
              value={ searchInput }
              onChange={ handleChange }
              data-testid="search-artist-input"
              type="text"
            />
            <button
              className="search-button"
              onClick={ handleClick }
              disabled={ searchInput.length < searchLengthMin }
              data-testid="search-artist-button"
              type="submit"
            >
              Pesquisar
            </button>
          </form>
        </div>

        {loading ? (
          <h2>Carregando...</h2>
        ) : (
          <div className="card-container">
            {songs.length > 0 ? (
              <>
                <div className="t-result">{`Resultado de álbuns de: ${saveSearch} `}</div>
                <SongCards songs={ songs } />
              </>
            ) : (
              <h1 className="no-album">Nenhum álbum foi encontrado</h1>
            )}
          </div>
        )}
      </div>

    </div>
  );
}

export default Search;
