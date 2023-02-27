import React, { useState } from 'react';
import { Carousel, CarouselItem, Form, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import SongCards from '../components/SongCards';
import artistAlbuns from '../services/topArtistsAPI';
import menuSand from '../images/menu-sand.png';
import './Search.css';

function Search() {
  const [searchInput, setsearchInput] = useState('');
  const [saveSearch, setSaveSearch] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchLengthMin = 2;
  const albums = artistAlbuns();
  const history = useHistory();

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

  const carouselHandleClick = (albumId) => {
    history.push(`album/${albumId}`);
  };

  const handleSand = () => {
    const header = document.getElementById('header');
    header.classList.add('display-change');
  };

  return (
    <div className="search-container" data-testid="page-search">
      <Header />
      <div className="main">

        <form className="div">
          <InputGroup className="form mb-3">
            <img onClick={ handleSand } className="menu-sand" src={ menuSand } alt="menu-sand" />
            <Form.Control
              className="form-input"
              placeholder="NOME DO ARTISTA"
              value={ searchInput }
              onChange={ handleChange }
              data-testid="search-artist-input"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
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
          </InputGroup>
        </form>

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
              <>
                <h1
                  className="mb-0 mt-4"
                  style={ { fontSize: '20px', color: 'black' } }
                >
                  Nenhum álbum foi encontrado
                </h1>
                <Carousel className="cos">
                  {albums.map((albu, index) => (
                    <CarouselItem
                      onClick={ () => carouselHandleClick(albu.id) }
                      key={ index }
                    >
                      <img src={ albu.albumImg } alt="Slide" />
                      <Carousel.Caption>
                        <h3 className="card-name mb-2">{albu.albumName}</h3>
                      </Carousel.Caption>
                    </CarouselItem>
                  ))}
                </Carousel>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
