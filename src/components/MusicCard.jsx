import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import { saveArtWork, saveEdited } from '../redux/actions/index';
import './MusicCard.css';
import loadingGif from '../images/loading.gif';
import musicPlay from '../images/200w.gif';
import songPaused from '../images/songPaused.png';
import getMusicsById from '../services/getMusicByIdAPI';

const titleLength = 15;
const slice = 15;
const timeOut = 1400;

function MusicCard({ tracks }) {
  const correntIndex = -1;
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(correntIndex);
  const dispatch = useDispatch();
  const location = useLocation();

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
        setIsPlay(false);
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
    if (location.pathname === '/favorites') {
      dispatch(saveArtWork({ art, name, track }));
    }
    setIsPlay(true);
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
      setIsPlay(false);
    }
  };

  return (
    <div className="fav-card-container">
      {isPlay ? (
        <img src={ musicPlay } alt="playGif" />
      ) : (
        <img src={ songPaused } alt="songPause" />
      )}
      <ul>
        {tracks.map((track, index) => (
          <li key={ index }>
            {
              track.title.length > titleLength
                ? `${track.title.slice(0, slice)}...`
                : track.title
            }
            {' '}
            <audio
              id={ index }
              onPlay={ () => audioPlayHandle(
                index,
                track.album.cover_big,
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
                <img className="loading-fav" src={ loadingGif } alt="loading" />
              ) : (
                <div
                  className={
                    favoriteSongs?.some((fav) => fav.id === track.id)
                      ? 'favorite'
                      : 'unfavorite'
                  }
                />
              )}

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
