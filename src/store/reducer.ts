import { combineReducers } from "redux";
import quiz from "./features/quiz";
import game from "./features/game";

export default combineReducers({ quiz, game });