import { applyMiddleware, combineReducers, createStore } from "redux";
import { userReducer } from "./reducers/userReducers";
import { adminReducer } from "./reducers/adminReucers";
import {thunk} from 'redux-thunk';
import logger from "redux-logger";

const rootReducer = combineReducers({
    user: userReducer,
    admin:adminReducer
});


export const store = createStore(rootReducer,applyMiddleware(thunk));
