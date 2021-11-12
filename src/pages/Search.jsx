import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      render: false,
      albums: [],
      saveNameArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      nameArtist: target.value,
    });
  }

  async handleClick() {
    const { nameArtist } = this.state;
    this.setState({
      render: true,
      saveNameArtist: nameArtist,
    });
    const artist = await searchAlbumsAPI(nameArtist);
    this.setState({
      nameArtist: '',
      render: false,
      albums: artist.map((ar) => ar),
    });
  }

  render() {
    const { nameArtist, render, albums, saveNameArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            name="find"
            value={ nameArtist }
            data-testid="search-artist-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            disabled={ nameArtist.length < 2 }
            data-testid="search-artist-button"
            onClick={ () => this.handleClick() }
          >
            Pesquisar
          </button>
        </form>
        {render && <Loading /> }
        {albums.length > 0
          ? <p>{`Resultado de álbuns de: ${saveNameArtist}`}</p>
          : <p>Nenhum álbum foi encontrado</p>}
        {!render && albums.map((album, index) => (
          <div key={ index }>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <p>{album.artistName}</p>
            </Link>
            <p>{album.collectionName}</p>
            <img src={ album.artworkUrl100 } alt={ album.artistName } />
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
