import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import { saveArtWork, saveEdited, setIsPlay } from '../redux/actions/index';
import './MusicCard.css';
import loadingGif from '../images/loading.gif';
import musicPlay from '../images/200w.gif';
import songPaused from '../images/songPaused.png';
import getMusicsById from '../services/getMusicByIdAPI';
import HandleTutorial from './HandleTutorial';

const titleLength = 15;
const slice = 15;
const timeOut = 1400;
const ws = 600;

function MusicCard({ tracks }) {
  const correntIndex = -1;
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(correntIndex);
  const dispatch = useDispatch();
  const location = useLocation();
  const isPlay = useSelector((state) => state.isPlayReducer.isPlay);

  useEffect(() => {
    const getFavorite = async () => {
      const favSongs = await getFavoriteSongs();
      setFavoriteSongs(favSongs);
      dispatch(saveEdited(favSongs));
    };
    getFavorite();
  }, [loading]);

  const handleFavClick = async (trackId, target) => {
    if (location.pathname === '/favorites' && target.id === trackId.toString()) {
      setTimeout(() => {
        dispatch(setIsPlay(false));
      }, timeOut);
    }
    setLoading(true);
    const getFav = await getFavoriteSongs();
    console.log(getFav);
    const sameVerify = getFav.some((fav) => fav.id === trackId);
    if (sameVerify) {
      const response = await getMusicsById(trackId);
      await removeSong(response);
    } else if (!sameVerify) {
      const response = await getMusicsById(trackId);

      await addSong(response);
    }

    setLoading(false);
  };

  const audioPlayHandle = (index, art, name, track) => {
    dispatch(saveArtWork({ art, name, track }));

    dispatch(setIsPlay(true));
    if (index !== currentTrackIndex) {
      const currentAudio = document.getElementById(currentTrackIndex);
      if (currentAudio) {
        currentAudio.pause();
      }
      setCurrentTrackIndex(index);
    }
  };

  const audioPauseHandle = () => {
    const myAudio = document.getElementById(currentTrackIndex);
    if (myAudio.paused) {
      dispatch(setIsPlay(false));
    }
  };

  return (
    <>
      <HandleTutorial />
      <div className="fav-card-container">

        {isPlay ? (
          <img className="fav-isplay" src={ musicPlay } alt="playGif" />
        ) : (
          <img className="fav-isplay" src={ songPaused } alt="songPause" />
        )}
        <ul>

          {tracks.map((track, index) => (
            <li key={ index }>
              <img className="card-track-art" src={ track.album.cover_big } alt="img" />
              <p className="track-title">{track.album.title}</p>
              <div className="card-max-display">
                {
                  track.title.length > titleLength
                    ? `${track.title.slice(0, slice)}...`
                    : track.title
                }
              </div>
              {' '}
              <audio
                id={ index }
                onPlay={ () => audioPlayHandle(
                  index,
                  window.innerWidth <= ws ? track.album.cover_big : track.album.cover_xl,
                  track.artist.name,
                  track.title,
                ) }
                onPause={ () => audioPauseHandle() }
                data-testid="audio-component"
                src={ track.preview }
                controls
              >
                <track kind="captions" />
              </audio>
              <label
                htmlFor={ track.id }
                data-testid={ `checkbox-music-${track.id}` }
              >
                {loading ? (
                  <img style={ { width: '24px' } } src={ loadingGif } alt="loading" />
                ) : (
                  <div
                    className={
                      favoriteSongs?.some((fav) => fav.id === track.id)
                        ? 'favorite'
                        : 'unfavorite'
                    }

                  />
                )}
                <div className="card-min-display">
                  {
                    track.title.length > titleLength
                      ? `${track.title.slice(0, slice)}...`
                      : track.title
                  }

                </div>

                <input
                  onChange={ ({ target }) => handleFavClick(track.id, target) }
                  type="checkbox"
                  className="my-checkbox"
                  id={ track.id }
                  checked={ favoriteSongs?.some(
                    (fav) => fav.id === track.id,
                  ) }
                />
              </label>

            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

MusicCard.propTypes = {
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MusicCard;
