import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: '',
      artistName: '',
      allAlbums: [],
      loading: true,
    };
    this.getMusicsAlbum = this.getMusicsAlbum.bind(this);
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getMusicsAlbum(id);
  }

  async getMusicsAlbum(id) {
    const arrayAlbum = await getMusics(id);
    const artist = arrayAlbum.find((array) => array.artistName);
    this.setState({
      albumMusics: artist.collectionName,
      artistName: artist.artistName,
      allAlbums: arrayAlbum,
      loading: false,
    });
  }

  render() {
    const { albumMusics, artistName, allAlbums, loading } = this.state;
    const artist = <p data-testid="artist-name">{`${artistName}`}</p>;
    const albumcd = <p data-testid="album-name">{`${albumMusics}`}</p>;
    return (
      <div>
        <Header />
        <div>
          {!loading ? artist : <Loading />}
          {!loading ? albumcd : <Loading />}
        </div>
        <div data-testid="page-album">
          <div className="track">
            {!loading && allAlbums
              .filter((filtro) => filtro.trackId !== undefined)
              .map((album) => (
                <MusicCard
                  key={ album.trackId }
                  previewUrl={ album.previewUrl }
                  name={ album.trackName }
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
