import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import posts from "./reducers/posts";
import postToEdit from "./reducers/postToEdit";

const reducers = combineReducers({ posts, postToEdit });

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
