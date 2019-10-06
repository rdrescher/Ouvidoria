import { Reducer } from "redux";
import { ISidebarState, NavigationTypes } from "./NavigationTypes";

const INITIAL_STATE: ISidebarState = {
    sidebarIsOpen: true
};

const reducer: Reducer = (state: ISidebarState = INITIAL_STATE, action) => {
    switch (action.type) {
        case NavigationTypes.Toggle_Sidebar:
            return { sidebarIsOpen: !state.sidebarIsOpen };
        case NavigationTypes.Close:
            return { sidebarIsOpen: false };
        case NavigationTypes.Open:
            return { sidebarIsOpen: true };
        default:
            return state;
    }
};

export default reducer;