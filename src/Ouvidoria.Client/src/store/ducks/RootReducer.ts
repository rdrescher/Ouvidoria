import {combineReducers} from "redux";
import NavigationReducer from "./navigation/NavigationReducer";
import DialogReducer from "./dialogDatatable/DialogReducer";

export default combineReducers({
    NavigationReducer,
    DialogReducer
});