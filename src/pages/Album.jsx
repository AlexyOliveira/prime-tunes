import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState([]);

  useEffect(() => {
    const url = window.location.href.split('/');
    const urlId = url[url.length - 1];
    const fetchSongById = async () => {
      setLoading(true);
      const musicsResponse = await getMusics(urlId);
      setLoading(false);
      setMusics(musicsResponse);
    };
    fetchSongById();
  }, []);

  return (
    <div data-testid="page-album">
      <Header />
      <div
        style={ { backgroundImage: `url(${musics[0]?.album.cover_xl})` } }
        className="main album-container"
      >
        <div className="div-album">
          <img
            style={ {
              padding: '10px',
              backgroundColor: 'black',
              boxShadow: '3px 3px 15px black',
            } }
            className="album-img"
            src={ musics[0]?.album.cover_big }
            alt={ musics[0]?.album.title }
          />
          <div>
            <h1 className="album-info" data-testid="artist-name">
              {musics[0]?.artist.name}
            </h1>
            <h3 className="album-info" data-testid="album-name">
              {musics[0]?.album.title}
            </h3>
          </div>
        </div>
        <div className="card-container">
          {loading ? (
            <div style={ { height: '1000px' } }><h2>Carregando...</h2></div>
          ) : (
            <div className="fav-list">
              <MusicCard tracks={ musics } />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Album;
