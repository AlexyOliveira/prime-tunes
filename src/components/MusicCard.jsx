import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import { saveArtWork, saveEdited } from '../redux/actions/index';
import './MusicCard.css';
import loadingGif from '../images/loading.gif';
import musicPlay from '../images/200w.gif';
import songPaused from '../images/songPaused.png';

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

  const handleFavClick = async (id, target) => {
    if (location.pathname === '/favorites' && target.id === id) {
      setIsPlay(false);
    }
    setLoading(true);
    const getFav = await getFavoriteSongs();

    const sameVerify = getFav.some((fav) => fav.trackId === id);
    if (sameVerify) {
      const response = await getMusics(id);
      await removeSong(response.pop());
    } else if (!sameVerify) {
      const response = await getMusics(id);
      await addSong(response.pop());
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
            {track.trackName}
            {' '}
            <audio
              id={ index }
              onPlay={ () => audioPlayHandle(
                index,
                track.artworkUrl100,
                track.artistName,
                track.trackName,
              ) }
              onPause={ () => audioPauseHandle() }
              data-testid="audio-component"
              src={ track.previewUrl }
              controls
            >
              <track kind="captions" />
            </audio>
            <label
              htmlFor={ track.trackId }
              data-testid={ `checkbox-music-${track.trackId}` }
            >
              {loading ? (
                <img className="loading-fav" src={ loadingGif } alt="loading" />
              ) : (
                <div
                  className={
                    favoriteSongs?.some((fav) => fav.trackId === track.trackId)
                      ? 'favorite'
                      : 'unfavorite'
                  }
                />
              )}

              <input
                onChange={ ({ target }) => handleFavClick(track.trackId, target) }
                type="checkbox"
                className="my-checkbox"
                id={ track.trackId }
                checked={ favoriteSongs?.some(
                  (fav) => fav.trackId === track.trackId,
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
