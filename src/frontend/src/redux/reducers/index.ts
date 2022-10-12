import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

// **Add here another reducers, that has to be persisted in localStorage of the user's browser**
const reducers = combineReducers({
    login: loginReducer
});

export default reducers;

export type RootState = ReturnType<typeof reducers>