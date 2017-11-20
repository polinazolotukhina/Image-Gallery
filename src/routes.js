import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/App';
import Home from './containers/Home';
import UploadForm from './containers/UploadForm';
import NotFoundPage from './components/NotFoundPage';


export default (
    <Router history={browserHistory}>
        <Route path="/" component={App}>experiments
            <IndexRoute component={Home} ignoreScrollBehavior />
            <Route path="/modify_gallery" component={UploadForm} ignoreScrollBehavior />
            <Route path="*" component={NotFoundPage} ignoreScrollBehavior />
        </Route>
    </Router>
);
