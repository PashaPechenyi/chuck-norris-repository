import { combineReducers } from "redux";
import favouriteJokes from "./favouriteJokes";

const rootReducer = combineReducers({ favouriteJokes });

export default rootReducer;
