import { action } from "typesafe-actions";
import { NavigationTypes } from "./NavigationTypes";

export function toggleSidebar() {
    return action(NavigationTypes.Toggle_Sidebar);
}

export function closeSidebar() {
    return action(NavigationTypes.Close);
}

export function openSidebar() {
    return action(NavigationTypes.Open);
}