import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import MyGroupList from "./MyGroupList";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import LoginModal from "./LoginModal";

import { useStore } from "../store/store";
import SnackbarCustom from "./SnackbarCustom";
import LinearProgress from "@material-ui/core/LinearProgress";
import LogoutButton from "./LogoutButton";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#fff",
    color: "#00a270",
    boxShadow: "none",
    borderBottom: "1px solid #e0e0e0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    minHeight: 56,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  logoFont: {
    fontFamily: "Lato",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    color: "#00a270",
  },
}));

interface ResponsiveDrawerProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children?: any;
  container?: Element;
}

export default function Dashboard(props: ResponsiveDrawerProps) {
  const { container, children } = props;
  const [{ user_id, loading, isInit }, dispatch] = useStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  function navigateGroupHandler(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    setMobileOpen(false);
    history.push("/");
  }

  function toRoot() {
    history.push("/");
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>version: 0.5.3</div>
      <Divider />
      <List>
        {user_id !== null && (
          <MyGroupList clickHandler={navigateGroupHandler} />
        )}
      </List>
    </div>
  );

  const drawerContainer = user_id !== null && (
    <nav aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === "rtl" ? "right" : "left"}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar classes={{ regular: classes.toolbar }}>
          <div className={classes.header}>
            {user_id !== null && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Typography
              variant="h6"
              onClick={toRoot}
              className={classes.logoFont}
            >
              Parti Mix
            </Typography>
            <Typography variant="h6" noWrap>
              {user_id === null ? <LoginModal /> : <LogoutButton />}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      {drawerContainer}
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {children && isInit && children}
        <SnackbarCustom />
        {loading && <LinearProgress />}
      </main>
    </div>
  );
}
