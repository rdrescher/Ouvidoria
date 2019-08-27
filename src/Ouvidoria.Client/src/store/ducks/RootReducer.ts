import {combineReducers} from "redux";
import NavigationReducer from "./navigation/NavigationReducer";
import DialogReducer from "./dialogDatatable/DialogReducer";
import MessageBoxReducer from "./messageBox/MessageBoxReducer";
import SessionReducer from "./session/SessionReducer";

export default combineReducers({
    NavigationReducer,
    DialogReducer,
    MessageBoxReducer,
    SessionReducer
});