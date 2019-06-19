import { createStore, Store } from "redux";
import { ISidebarState } from "./ducks/navigation/NavigationTypes";
import RootReducer from "./ducks/RootReducer";

const store: Store<IApplicationState> = createStore(RootReducer);

export default store;

export interface IApplicationState {
    NavigationReducer: ISidebarState;
}