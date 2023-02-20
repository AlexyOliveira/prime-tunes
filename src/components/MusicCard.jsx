import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ tracks }) {
  return (
    <div>
      <ul>
        {tracks.map((track, index) => (

          <li key={ index }>
            {track.trackName}
            {' '}
            <audio data-testid="audio-component" src={ track.previewUrl } controls>
              <track kind="captions" />
            </audio>

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
