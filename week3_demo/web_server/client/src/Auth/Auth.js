class Auth {
  static authenticateUser(token, email) {
    localStrage.setItem('token', token);
    localStrage.setItem('email', email);
  }

  static isUserAuthenticated() {
    return localStrage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStrage.removeItem('token');
    localStrage.removeItem('email');
  }

  static getToken() {
    return localStrage.getItem('token');
  }

  static getEmail() {
    return localStrage.getItem('email');
  }
}

export default Auth;
