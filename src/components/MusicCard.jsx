import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const {
      previewUrl,
      name,
      trackId,
      saveFavorite,
      favorites,
    } = this.props;
    return (
      <div>
        <div>
          <p>{`${name}`}</p>
          <audio
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento.
            <code>audio</code>
          </audio>
          <label htmlFor={ trackId }>
            Favorita
            <input
              type="checkbox"
              id={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
              checked={ favorites }
              onChange={ saveFavorite }
            />
          </label>
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  saveFavorite: PropTypes.func.isRequired,
  favorites: PropTypes.bool.isRequired,
};
export default MusicCard;
