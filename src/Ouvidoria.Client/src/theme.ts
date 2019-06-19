import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";

const white = "#fff";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0083B0"
    },
    secondary: {
      main: "#00B4DB"
    },
    error: {
      main: red.A400
    },
    background: {
      default: white
    },
    text: {
      secondary: white
    },

  },
  overrides: {
    MuiAppBar: {
      colorSecondary: {
        color: white
      }
    },
    MuiButton: {
      containedSecondary: {
        color: white
      }
    },
    MuiPaper: {
      elevation4: {
        boxShadow: "none"
      }
    },
    MuiListItemIcon: {
      root: {
        color: white
      }
    },
    MuiTypography: {
      h6: {
        fontWeight: 400
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: "rgba(255, 255, 255, 0.25)"
      }
    },
    MuiCheckbox: {
      root: {
        color: "#999"
      }
    },
    MuiMenu: {
      paper: {
        top: "65px !important"
      }
    }
  }
});

export default theme;
