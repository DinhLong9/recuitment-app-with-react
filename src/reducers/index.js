import { combineReducers } from "redux";

import { loginReducer } from "./loginReducers";
import { reloadReducer } from "./reloadReducer";

export const allReducers = combineReducers({ loginReducer, reloadReducer });
