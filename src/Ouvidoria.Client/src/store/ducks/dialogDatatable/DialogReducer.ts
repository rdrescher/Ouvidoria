import { Reducer } from "redux";
import { IDialogState, DialogTypes } from "./DialogTypes";

const INITIAL_STATE: IDialogState = {
    dialogIsOpen: false,
    operation: "Criar",
    selectedObject: {}
};

const reducer: Reducer = (state: IDialogState = INITIAL_STATE, action) => {
    switch (action.type) {
        case DialogTypes.Open_Dialog:
            return { dialogIsOpen: true, operation: action.operation, selectedObject: action.selectedObject };
        case DialogTypes.Close_Dialog:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default reducer;