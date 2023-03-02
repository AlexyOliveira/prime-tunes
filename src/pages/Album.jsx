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
import loadingGif from '../images/loading.gif';

function Album() {
  const [loading, setLoading] = useState(false);
  const [musics, setMusics] = useState([]);
  const isPlay = useSelector((state) => state.isPlayReducer.isPlay);
  const dispatch = useDispatch();
  const innerWidth = 600;

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
    if (window.innerWidth <= innerWidth) {
      const art = musics[0]?.album.cover_xl;
      dispatch(saveArtWork({ art }));
    }
    const art = musics[0]?.album.cover_xl;
    dispatch(saveArtWork({ art }));
  }, []);

  useEffect(() => () => {
    const art = 'https://http2.mlstatic.com/D_NQ_NP_276705-MLB25071094077_092016-O.jpg';
    dispatch(saveArtWork({ art }));
  }, [dispatch]);

  return (
    <div data-testid="page-album">
      <Header />
      <div
        style={ {
          backgroundImage: `url(${
            window.innerWidth <= innerWidth
              ? musics[0]?.album.cover_big
              : musics[0]?.album.cover_xl
          })`,
        } }
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
            src={ musics[0]?.album.cover_big }
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
            <div style={ { height: '1000px' } }>
              <img
                style={ { width: '100px', marginTop: '200px' } }
                src={ loadingGif }
                alt="loadingGif"
              />
              {' '}
            </div>
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
