import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {comments} from './comments';
import {promotions} from './promotions';
import {leaders} from './leaders';

export const configureStore= () => {
    return createStore(
        combineReducers({
            dishes, comments, leaders, promotions
        }),
        applyMiddleware(thunk, logger)
    );
};
