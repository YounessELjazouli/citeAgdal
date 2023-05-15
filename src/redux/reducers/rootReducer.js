import { combineReducers } from "redux";
import { authReducer } from "./authReducer";


export const rootReducer = combineReducers({
    AuthReducer : authReducer,

})

