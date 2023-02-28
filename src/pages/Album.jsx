import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';
import SandButton from '../components/SandButton';
import musicPlay from '../images/200w.gif';
import songPaused from '../images/songPaused.png';
import { saveArtWork, setIsPlay } from '../redux/actions';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const isPlay = useSelector((state) => state.isPlayReducer.isPlay);
  const trackArt = useSelector((state) => state.artWorkReducer.artWork);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsPlay(false);
    const url = window.location.href.split('/');
    const urlId = url[url.length - 1];
    const fetchSongById = async () => {
      setLoading(true);
      const musicsResponse = await getMusics(urlId);
      setLoading(false);
      setMusics(musicsResponse);
    };
    fetchSongById();
    const art = musics[0]?.album.cover_xl;
    dispatch(saveArtWork({ art }));
  }, []);

  return (
    <div data-testid="page-album">
      <Header />
      <div
        style={ { backgroundImage: `url(${musics[0]?.album.cover_xl})` } }
        className="main album-container"
      >
        <div className="div-album">
          <SandButton />
          <img
            style={ {
              padding: '10px',
              backgroundColor: 'black',
              boxShadow: '3px 3px 15px black',
            } }
            className="album-img"
            src={ trackArt }
            alt={ musics[0]?.album.title }
          />
          <div>
            <h1 className="album-info" data-testid="artist-name">
              {musics[0]?.artist.name}
            </h1>
            <h3 className=" album-info" data-testid="album-name">
              {musics[0]?.album.title}
            </h3>
          </div>
          {isPlay ? (
            <img className="isplay" src={ musicPlay } alt="playGif" />
          ) : (
            <img className="isplay" src={ songPaused } alt="songPause" />
          )}
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
