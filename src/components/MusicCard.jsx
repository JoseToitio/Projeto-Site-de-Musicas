import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { previewUrl, name } = this.props;
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
        </div>
      </div>
    );
  }
}
MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
export default MusicCard;
