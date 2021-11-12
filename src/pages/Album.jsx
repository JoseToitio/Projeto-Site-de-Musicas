import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      albumMusics: '',
      artistName: '',
      allAlbums: [],
      loading: true,
      songsLike: [],
    };
    this.getMusicsAlbum = this.getMusicsAlbum.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.loadingPage = this.loadingPage.bind(this);
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
      allAlbums: arrayAlbum.filter((filtro) => filtro.trackId !== undefined),
      loading: false,
    });
  }

  saveFavorite({ target }) {
    const { allAlbums } = this.state;
    this.loadingPage();
    addSong(allAlbums)
      .then(() => {
        this.setState(({ songsLike }) => ({ loading: false,
          songsLike: [...songsLike, Number(target.id)],
        }));
      });
  }

  loadingPage() {
    this.setState(({ loading }) => ({
      loading: !loading,
    }));
  }

  render() {
    const { albumMusics, artistName, allAlbums, loading, songsLike } = this.state;
    const artist = <p data-testid="artist-name">{`${artistName}`}</p>;
    const albumcd = <p data-testid="album-name">{`${albumMusics}`}</p>;
    return (
      <div>
        <Header />
        <div>
          { artist }
          { albumcd }
        </div>
        <div data-testid="page-album">
          {loading && <Loading />}
          <div className="track">
            {!loading && allAlbums
              .map((album) => (
                <MusicCard
                  key={ album.trackId }
                  previewUrl={ album.previewUrl }
                  name={ album.trackName }
                  trackId={ album.trackId }
                  saveFavorite={ this.saveFavorite }
                  favorites={ songsLike.some((music) => music === album.trackId) }
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
