import {createStore, compose, applyMiddleware} from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { apiMiddleware  } from 'redux-api-middleware';
import rootReducer from '../reducers';
import logger from 'redux-logger';
import { loadingBarMiddleware  } from 'react-redux-loading-bar';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

const fbConfig = {
    apiKey: "AIzaSyAVriwqcQmjH4UK5BTTNBsa-3FgcLrQgL4",
    authDomain: "image-galery.firebaseapp.com",
    databaseURL: "https://image-galery.firebaseio.com",
    projectId: "image-galery",
    storageBucket: "image-galery.appspot.com",
    messagingSenderId: "69706574187"
};

const config = {
  fileMetadataFactory: (uploadRes) => {
    // upload response from Firebase's storage upload
    const { metadata: { name, fullPath, downloadURLs } } = uploadRes;
    // default factory includes name, fullPath, downloadURL
    return {
      name,
      fullPath,
      thumbnail: downloadURLs[0],
      src: downloadURLs[0],
      thumbnailWidth: 320,
      thumbnailHeight: 174,
    };
  }
};

function configureStoreProd(initialState) {
    const middlewares = [
        // Add other middleware on this line...

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk
    ];

    return createStore(rootReducer, initialState, compose(
        applyMiddleware(...middlewares),
        reactReduxFirebase(
            fbConfig, config


        )
    )
    );
}

function configureStoreDev(initialState) {
    const middlewares = [
        // Add other middleware on this line...
        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        apiMiddleware,
        thunk,
        logger,
        thunk.withExtraArgument(getFirebase),
        loadingBarMiddleware({
            promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
        })
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares),
        reactReduxFirebase(fbConfig, config)
    )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }

    return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
