import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ipReducer from "./Reducer";

// Middleware untuk Redux Thunk
const middleware = [thunk];

// Buat store Redux
const store = createStore(ipReducer, applyMiddleware(...middleware));

export default store;
