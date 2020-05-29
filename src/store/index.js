import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootSaga from './sagas'
import createRootReducer from './reducers';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();
const enhancers = composeWithDevTools(
    applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    )
)

const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = createRootReducer(history);
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, enhancers);

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export default {
    store,
    persistor
};
