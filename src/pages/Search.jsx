import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      nameArtist: target.value,
    });
  }

  render() {
    const { nameArtist } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
