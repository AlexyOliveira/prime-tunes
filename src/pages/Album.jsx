import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

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
      {
        loading ? <h2>Carregando...</h2> : (
          <>
            <h1 data-testid="artist-name">{musics[0]?.artistName}</h1>
            <h3 data-testid="album-name">{musics[0]?.collectionName}</h3>
            <MusicCard tracks={ musics.slice(1) } />
          </>
        )
      }

    </div>
  );
}

export default Album;
