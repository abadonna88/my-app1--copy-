import { applyMiddleware, combineReducers, createStore } from "redux";
import profileReducer from "./profileReducer";
import { dialogReducer } from './dialogReducer';
import { userReducer } from './userReducer';
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import { appReducer } from "./appReducer";

let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: dialogReducer,
    usersPage: userReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;