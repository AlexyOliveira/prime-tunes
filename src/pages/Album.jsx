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
      <div className="main album-container">
        <div className="div-album">
          <img
            style={ {
              padding: '10px',
              backgroundColor: 'black',
              boxShadow: '3px 3px 15px black',
            } }
            className="album-img"
            src={ musics[0]?.artworkUrl100 }
            alt={ musics[0]?.collectionName }
          />
          <div>
            <h1 className="album-info" data-testid="artist-name">
              {musics[0]?.artistName}
            </h1>
            <h3 className="album-info" data-testid="album-name">
              {musics[0]?.collectionName}
            </h3>
          </div>
        </div>
        <div className="card-container">
          {loading ? (
            <h2>Carregando...</h2>
          ) : (
            <div className="fav-list">
              <MusicCard tracks={ musics.slice(1) } />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Album;
