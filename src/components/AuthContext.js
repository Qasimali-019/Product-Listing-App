import React from "react";

const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = { isAuthenticated: false };

  login = () => this.setState({ isAuthenticated: true });
  logout = () => this.setState({ isAuthenticated: false });

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: this.state.isAuthenticated,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export { AuthContext, AuthProvider };