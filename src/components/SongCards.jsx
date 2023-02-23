import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SongCards.css';
import { Card } from 'react-bootstrap';

function SongCards({ songs }) {
  const artistLength = 20;
  const slice = 20;
  return (
    <div className="card-scroll-container">
      {songs.map((artist, index) => (
        <Card style={ { width: '11rem' } } key={ index }>
          <Card.Img
            variant="top"
            src={ artist.artworkUrl100 }
            alt={ artist.collectionName }
          />
          <br />
          <Card.Body>
            <Link
              className="ir card-title"
              id="link"
              data-testid={ `link-to-album-${artist.collectionId}` }
              to={ `/album/${artist.collectionId}` }
            >
              <p title={ artist.collectionName }>
                {artist.collectionName.length > artistLength
                  ? `${artist.collectionName.slice(0, slice)}...`
                  : artist.collectionName}
              </p>
            </Link>
          </Card.Body>
        </Card>
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
