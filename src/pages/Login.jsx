import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div data-testid="page-login">
        <form>
          <input type="text" name="nome" />
        </form>
      </div>
    );
  }
}

export default Login;
