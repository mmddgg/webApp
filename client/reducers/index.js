import { combineReducers } from 'redux';
import common from "./common";
import {login} from "./userCenter";
//import {} from "./dashboard";




export default combineReducers({
    common,
    login
})



