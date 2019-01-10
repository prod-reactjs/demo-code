import React from 'react';
import Raven from 'raven-js';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/src/styles/index.scss';
import 'event-source-polyfill';
import configureStore from './redux/configureStore';
import routes from './routes';
import { setCountries, setTimezones } from './redux/modules/common';

Raven.config('https://xxxxx@sentry.io/183044').install();
/*  eslint-disable */
// if (!String.prototype.startsWith) {
//     String.prototype.startsWith = function(searchString, position){
//       position = position || 0;
//       return this.substr(position, searchString.length) === searchString;
//   };
// }

/* eslint-enable */

/* global VERSION, COMMITHASH */
console.log(VERSION);
console.log(COMMITHASH);

const xhr = new XMLHttpRequest();
xhr.open('GET', `${process.env.PUBLIC_URL}/config.json`, false);
xhr.send();
if (xhr.readyState === 4 && xhr.status === 200) {
  const config = JSON.parse(xhr.response);
  localStorage.setItem('API_ENDPOINT', config.API);
  localStorage.setItem('CAPTCHA', config.CAPTCHA);
  localStorage.setItem('TemplateSpecification', config.TemplateSpecification);
}


if (window.loading_screen) {
  window.loading_screen.finish();
}
window.loading_screen = null;

const initialState = {
  app: {
    contacts: {
      list: [],
      searchPanel: false,
    },
    dashboard: {
      activity: { loading: true },
      appointments: { loading: true },
      notes: { loading: true },
      todos: { loading: true },
    },
    offers: {
      searchPanel: false,
    },
    properties: {
      list: [],
      searchPanel: false,
    },
    tenancies: {
      searchPanel: false,
    }
  },
  user: {
    user: {},
  }
};


const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const childRoutes = routes(store);
require.ensure([
  './common/countries.json',
  './common/timezones.json'
], (require) => {
  const countries = require('./common/countries.json');
  const timezones = require('./common/timezones.json');
  store.dispatch(setCountries(countries));
  store.dispatch(setTimezones(timezones));
});

render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        {childRoutes}
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
      />
    </div>
  </Provider>,
  document.getElementById('juvo')
);
