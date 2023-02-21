import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import { saveEdited } from '../redux/actions/index';

function MusicCard({ tracks }) {
  const [loading, setLoading] = useState(false);
  const [favoriteSongs, setFavoriteSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFavorite = async () => {
      const favSongs = await getFavoriteSongs();
      setFavoriteSongs(favSongs);
      dispatch(saveEdited(favSongs));
    };
    getFavorite();
  }, [loading]);

  const handleFavClick = async (id) => {
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

  return (
    <div>
      {loading ? (
        <h2>Carregando...</h2>
      ) : (
        <ul>
          {tracks.map((track, index) => (
            <li key={ index }>
              {track.trackName}
              {' '}
              <audio
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
                Favorita
                <input
                  onChange={ () => handleFavClick(track.trackId) }
                  type="checkbox"
                  id={ track.trackId }
                  checked={ favoriteSongs?.some((fav) => fav.trackId === track.trackId) }
                />
              </label>
            </li>
          ))}
        </ul>
      )}
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
