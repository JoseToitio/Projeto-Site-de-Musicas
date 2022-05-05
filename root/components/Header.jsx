import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      render: false,
    };
    this.getUserAPI = this.getUserAPI.bind(this);
    this.loadUser = this.loadUser.bind(this);
  }

  componentDidMount() {
    this.getUserAPI();
  }

  getUserAPI() {
    this.setState({
      render: true,
    }, async () => {
      const getUserName = await getUser();
      this.setState({
        user: getUserName.name,
        render: false,
      });
    });
  }

  loadUser() {
    const { user } = this.state;
    return (
      <span data-testid="header-user-name">{`Usuario: ${user}`}</span>
    );
  }

  render() {
    const { render } = this.state;
    return (
      <header data-testid="header-component" className="header">
        {render ? <Loading /> : this.loadUser()}
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/album/:id">Album</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        <Link to="/profile/edit">Profile Edit</Link>
      </header>
    );
  }
}

export default Header;
