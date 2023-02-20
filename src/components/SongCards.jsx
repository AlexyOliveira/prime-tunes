import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function SongCards({ songs }) {
  return (
    <div>
      {songs.map((artist, index) => (
        <li key={ index }>
          <img src={ artist.artworkUrl100 } alt="" />
          <br />
          <Link
            className="ir"
            id="link"
            data-testid={ `link-to-album-${artist.collectionId}` }
            to={ `/album/${artist.collectionId}` }
          >
            <p>{artist.collectionName}</p>
          </Link>
        </li>
      ))}

    </div>
  );
}

SongCards.propTypes = {
  songs: PropTypes.arrayOf(
    PropTypes.shape({
      artistId: PropTypes.number.isRequired,
      artistName: PropTypes.string.isRequired,
      artworkUrl100: PropTypes.string.isRequired,
      collectionId: PropTypes.number.isRequired,
      collectionName: PropTypes.string.isRequired,
      releaseDate: PropTypes.string.isRequired,
      trackCount: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

export default SongCards;
