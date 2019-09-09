import { createStore, Store } from "redux";
import { IDialogState } from "./ducks/dialogDatatable/DialogTypes";
import { IDialogMessagesState } from "./ducks/dialogMessages/DialogMessagesTypes";
import { ILoadingState } from "./ducks/loading/LoadingTypes";
import { IMessageBoxState } from "./ducks/messageBox/MessageBoxTypes";
import { ISidebarState } from "./ducks/navigation/NavigationTypes";
import { ISessionState } from "./ducks/session/SessionTypes";
import RootReducer from "./ducks/RootReducer";

const store: Store<IApplicationState> = createStore(RootReducer);

export default store;

export interface IApplicationState {
  NavigationReducer: ISidebarState;
  DialogReducer: IDialogState;
  MessageBoxReducer: IMessageBoxState;
  SessionReducer: ISessionState;
  DialogMessagesReducer: IDialogMessagesState;
  LoadingReducer: ILoadingState;
}
