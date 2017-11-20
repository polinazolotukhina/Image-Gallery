import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { firebaseStateReducer } from 'react-redux-firebase';


const rootReducer = combineReducers({
    routing: routerReducer,
    firebase: firebaseStateReducer,
});

export default rootReducer;
