import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/app';
import NotePage from './containers/note';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={NotePage} />
  </Route>
);
