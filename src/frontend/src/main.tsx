import React from 'react';
import ReactDOM from 'react-dom';

// Root component
import Root from './views/root/Root';

// router
import {Router} from "react-router-dom";
import history from "./functions/history";

// redux
import {Provider} from 'react-redux';
import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./redux";

// helmet provider
import {HelmetProvider} from "react-helmet-async";

// providers
import WindowSizeProvider from "./providers/window-size-provider.component";
import IsMobileViewProvider from "./providers/is-mobile-view-provide.component";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
          <WindowSizeProvider>
            <IsMobileViewProvider>
              <Router history={history}>
                <Root />
              </Router>
            </IsMobileViewProvider>
          </WindowSizeProvider>
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
