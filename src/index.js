import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Main from 'containers/main.container';

const renderApp = Component => {
  render(
    <AppContainer>
      <MuiThemeProvider>
        <Component />
      </MuiThemeProvider>
    </AppContainer>,
    document.querySelector('#container')
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('containers/main.container', () => {
    renderApp(Main);
  });
}
