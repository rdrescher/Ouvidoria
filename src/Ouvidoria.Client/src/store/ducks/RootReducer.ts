import {combineReducers} from "redux";
import NavigationReducer from "./navigation/NavigationReducer";
import DialogReducer from "./dialogDatatable/DialogReducer";
import MessageBoxReducer from "./messageBox/MessageBoxReducer";

export default combineReducers({
    NavigationReducer,
    DialogReducer,
    MessageBoxReducer
});