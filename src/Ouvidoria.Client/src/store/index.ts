import { createStore, Store } from "redux";
import { ISidebarState } from "./ducks/navigation/NavigationTypes";
import RootReducer from "./ducks/RootReducer";
import { IDialogState } from "./ducks/dialogDatatable/DialogTypes";

const store: Store<IApplicationState> = createStore(RootReducer);

export default store;

export interface IApplicationState {
    NavigationReducer: ISidebarState;
    DialogReducer: IDialogState;
}