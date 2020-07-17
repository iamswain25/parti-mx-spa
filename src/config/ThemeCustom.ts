import { Theme, createMuiTheme } from "@material-ui/core";
const DRAWER_MIN_HEIGHT = 56;
export const theme: Theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          display: "block",
        },
        button: {
          color: "inherit",
        },
        a: {
          textDecoration: "none",
        },
      },
    },
  },
  palette: {
    primary: { main: "#00a270", dark: "#009062", light: "#e3f5ef" },
  },
  mixins: {
    toolbar: {
      minHeight: DRAWER_MIN_HEIGHT,
      "@media (min-width: 600px)": {
        minHeight: DRAWER_MIN_HEIGHT,
      },
      "@media (min-width:0px) and (orientation: landscape)": {
        minHeight: DRAWER_MIN_HEIGHT,
      },
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
        body1: "div",
        body2: "div",
        // h6: "div",
      },
    },
  },
  typography: {
    fontFamily: "NotoSansCJKkr",
    h2: {
      fontSize: 20,
      letterSpacing: -0.75,
    },
    h3: {
      //제목
      fontSize: 18,
      letterSpacing: -0.5,
    },
    h4: {
      fontSize: 16,
      letterSpacing: -0.6,
      fontWeight: "inherit",
    },
    h5: {
      fontSize: 14,
      letterSpacing: -0.3,
      fontWeight: "inherit",
    },
    h6: {
      fontSize: 12,
      fontWeight: "inherit",
    },
    body1: {
      fontSize: 14,
      letterSpacing: -0.3,
      fontWeight: "inherit",
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
    },
    body2: {
      fontSize: 11,
      fontWeight: "inherit",
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
    },
    subtitle1: {
      fontSize: 14,
      letterSpacing: -0.38,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
    subtitle2: {
      fontSize: 11,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
    button: {
      fontSize: 14,
      letterSpacing: 0.2,
      display: "flex",
      flexWrap: "wrap",
      wordBreak: "break-all",
      fontWeight: "inherit",
    },
  },
});
