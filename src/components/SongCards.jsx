import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SongCards.css';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { saveArtWork } from '../redux/actions';

function SongCards({ songs }) {
  const artistLength = 20;
  const slice = 20;
  const dispatch = useDispatch();
  const ws = 600;

  const handleClick = (art) => {
    dispatch(saveArtWork({ art }));
  };

  return (
    <div className="card-scroll-container">
      {songs.map((artist, index) => (
        <Card className="song-cads-card" key={ index }>
          <Card.Img
            variant="top"
            src={ window.innerWidth <= ws ? artist.cover_medium : artist.cover_big }
            alt={ artist.title }
          />
          <br />
          <Card.Body>
            <Link
              onClick={ () => handleClick(artist.cover_mediam) }
              className="ir card-title"
              id="link"
              data-testid={ `link-to-album-${artist.id}` }
              to={ `/album/${artist.id}` }
            >
              <p title={ artist.title }>
                {artist.title.length > artistLength
                  ? `${artist.title.slice(0, slice)}...`
                  : artist.title}
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
