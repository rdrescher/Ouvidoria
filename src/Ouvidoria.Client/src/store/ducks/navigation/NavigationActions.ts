import { action } from "typesafe-actions";
import { NavigationTypes } from "./NavigationTypes";

export function toggleSidebar() {
    return action(NavigationTypes.Toggle_Sidebar);
}