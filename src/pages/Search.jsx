import React, { useState } from 'react';
import { Carousel, CarouselItem, Form, InputGroup } from 'react-bootstrap';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import SongCards from '../components/SongCards';
import './Search.css';

const albums = [
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-491-harry-styles-fine-line.jpg?w=1000', albumName: 'Harry Styles, ‘Fine Line’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-488-The-Stooges-The-Stooges.jpg?w=1000', albumName: 'The Stooges, ‘The Stooges’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-492-Bonnie-Raitt-Nick-of-Time.jpg?w=1000', albumName: 'Bonnie Raitt, ‘Nick of Time’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-484-Lady-Gaga-Born-This-Way.jpg?w=1000', albumName: 'Lady Gaga, ‘Born This Way’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-442-Weeknd-beauty-behind-the-madness.jpg?w=1000', albumName: 'The Weeknd, ‘Beauty Behind the Madness’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-375-green-day-dookie.jpg?w=1000', albumName: 'Green Day, ‘Dookie’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-382-Tame-Impala-Currents.jpg?w=1000', albumName: 'Tame Impala, ‘Currents’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-389-Mariah-Carey-Emancipation-of-Mimi.jpg?w=1000', albumName: 'Mariah Carey, ‘The Emancipation of Mimi’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-332-Elvis-Presley-Elvis-Presley.jpg?w=1000', albumName: 'Elvis Presley, ‘Elvis Presley’' },
  { albumImg: 'https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-324-Coldplay-A-Rush-of-Blood-to-the-Head.jpg?w=1000', albumName: 'Coldplay, ‘A Rush of Blood to the Head’' },
];

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
        <form className="div">
          <InputGroup className="form mb-3">
            <Form.Control
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
                <h1 className="mb-0 mt-4" style={ { fontSize: '20px' } }>
                  Nenhum álbum foi encontrado
                </h1>
                <Carousel
                  className=""
                  style={ { width: '500px', padding: '40px' } }
                >
                  {albums.map((albu, index) => (
                    <CarouselItem key={ index }>
                      <img src={ albu.albumImg } alt="Slide 1" />
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
