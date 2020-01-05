import React from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';

import App from './app';
import AllIssuesPage from './components/AllIssuesPage';
import EditIssuePage from './components/EditIssue';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={AllIssuesPage} />
    {/* <Route path="addComment" component={AddCommentPage} /> */}
    <Route path="edit/:id" component={EditIssuePage} />
    {/* <Redirect from="comments" to="/" /> */}
    {/* <Redirect from="coments" to="/" /> */}
  </Route>
);
