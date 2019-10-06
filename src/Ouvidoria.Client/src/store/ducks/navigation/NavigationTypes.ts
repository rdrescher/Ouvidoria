export enum NavigationTypes {
    Toggle_Sidebar = "@navigation/ToogleSidebar",
    Close = "@navigation/Close",
    Open = "@navigation/Open"
}

export interface ISidebarState {
    readonly sidebarIsOpen: boolean;
}