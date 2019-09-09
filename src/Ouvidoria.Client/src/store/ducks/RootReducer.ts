import { combineReducers } from "redux";
import DialogReducer from "./dialogDatatable/DialogReducer";
import DialogMessagesReducer from "./dialogMessages/DialogMessagesReducer";
import LoadingReducer from "./loading/LoadingReducer";
import MessageBoxReducer from "./messageBox/MessageBoxReducer";
import NavigationReducer from "./navigation/NavigationReducer";
import SessionReducer from "./session/SessionReducer";

export default combineReducers({
  NavigationReducer,
  DialogReducer,
  MessageBoxReducer,
  SessionReducer,
  DialogMessagesReducer,
  LoadingReducer
});
