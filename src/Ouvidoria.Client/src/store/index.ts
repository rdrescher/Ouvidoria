import { createStore, Store } from "redux";
import { ISidebarState } from "./ducks/navigation/NavigationTypes";
import RootReducer from "./ducks/RootReducer";
import { IDialogState } from "./ducks/dialogDatatable/DialogTypes";
import { IMessageBoxState } from "./ducks/messageBox/MessageBoxTypes";

const store: Store<IApplicationState> = createStore(RootReducer);

export default store;

export interface IApplicationState {
  NavigationReducer: ISidebarState;
  DialogReducer: IDialogState;
  MessageBoxReducer: IMessageBoxState;
}
