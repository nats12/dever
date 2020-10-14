import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "./Auth/react-auth0-spa";
import history from "./utils/history";


ReactDOM.render(
    <Auth0Provider
      domain="dev-2hb7anjl.eu.auth0.com"
      client_id="lz0RNj4bJWafSi3fgCHMconX6TJQg6hj"
      redirect_uri="http://localhost:3001"
      audience="http://localhost:8000/"
    >
      <App />
    </Auth0Provider>,
    document.getElementById("root")
  );


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
