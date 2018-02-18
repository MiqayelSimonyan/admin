import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { createMemoryHistory } from 'history';

import NavigationComponent from '../components/navigation.component';
import AppComponent from '../components/app.component';
import UserListContainer from './user.list.container';
import DeviceListContainer from './device.list.container';
import PermissionListContainer from './permission.list.container';
import PageNotFound from '../components/page.not.found.component';
import store from '../store';

let history;
if (typeof window !== 'undefined') {
  window.store = store;
  history = createBrowserHistory();
} else {
  history = createMemoryHistory();
}

export default class Main extends Component {
  render() {
    return (
      <div>
        <Provider key={module.hot ? Date.now() : store} store={store}>
          <Router history={history}>
            <div>
              <NavigationComponent />
              <Switch>
                <Route exact path="/" component={AppComponent} />
                <Route exact path="/users" component={UserListContainer} />
                <Route exact path="/devices" component={DeviceListContainer} />
                <Route exact path="/permissions" component={PermissionListContainer} />
                <Route component={PageNotFound} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </div>
    );
  }
}
