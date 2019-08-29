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
      },
      colorInherit: {
        color: "rgba(0, 0, 0, 0.54)"
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
    MuiTableCell: {
      head: {
        color: "black",
        lineHeight: "0.3125rem"
      },
      body: {
        padding: "6px 24px 6px 16px"
      }
    },
    MuiInputLabel: {
      root: {
        color: "rgba(0.0, 0, 0.2, 0.5)"
      }
    },
    MuiDialog: {
      root: {
        // tslint:disable-next-line:no-any
        zIndex: "10000 !important" as any
      }
    },
    MuiIconButton: {
      colorInherit: {
        color: "rgba(0, 0, 0, 0.54)"
      },
    },
    MuiTablePagination: {
      input: {
        color: "rgba(0, 0, 0, 0.54)"
      }
    },
    MuiFormControl: {
      root: {
        marginTop: 10
      }
    },
  }
});

export default theme;
