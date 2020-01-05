import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, setAdmin, logoutUser } from './actions/authentication';
import '../node_modules/normalize.css/normalize.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './styles/styles.css';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  decoded.userName === 'admin'
    ? store.dispatch(setAdmin(decoded))
    : store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div style={{ overflowY: 'overlay' }}>
            <AppRouter />
          </div>
        </Router>
      </Provider>
    );
  }
}
