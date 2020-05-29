import React from 'react';
import {
    Switch,
    Route
} from "react-router-dom";
import { Provider } from 'react-redux';

import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';
import store, { history } from 'store';

import routes from 'routes';
import PrivateRoute from './components/router/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import List from './pages/List';
import Confirm from './pages/Confirm';

const App = () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" exact component={Login} />
                        <Route path={routes.login} exact component={Login} />
                        <Route path={routes.register} exact component={Register} />
                        <Route path={routes.confirm} exact component={Confirm} />
                        <PrivateRoute path={routes.list} exact component={List} />
                    </Switch>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
}

export default App;
