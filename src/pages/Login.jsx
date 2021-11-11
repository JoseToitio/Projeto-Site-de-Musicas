import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: '',
      loading: false,
      reloading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.clickButton = this.clickButton.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      user: target.value,
    });
  }

  disableButton() {
    const { user } = this.state;
    const number = 3;
    if (user.length >= number) {
      return false;
    }
    return true;
  }

  async clickButton() {
    const { user } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: user });
    this.setState(() => ({ loading: false, reloading: true }));
  }

  render() {
    const { reloading, loading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <input
            type="text"
            name="nome"
            placeholder="Digite seu nome"
            data-testid="login-name-input"
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ this.disableButton() }
            onClick={ () => this.clickButton() }
          >
            Entrar
          </button>
        </form>
        { reloading && <Redirect to="/search" /> }
        {loading && <Loading />}
      </div>
    );
  }
}

export default Login;
