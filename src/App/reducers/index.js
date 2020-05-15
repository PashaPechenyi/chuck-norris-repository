import { combineReducers } from "redux";
import favouriteJokes from "./jokes";

const rootReducer = combineReducers({ favouriteJokes });

export default rootReducer;
