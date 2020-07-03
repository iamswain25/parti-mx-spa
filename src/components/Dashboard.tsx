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
import { auth } from "../config/firebase";
import MyGroupList from "./MyGroupList";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { useStore } from "../store/store";
import SnackbarCustom from "./SnackbarCustom";
import LinearProgress from "@material-ui/core/LinearProgress";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
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
      width: "100%",
    },
  })
);

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
  const [{ user_id, loading, isInit }] = useStore();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    await auth.signOut();
    history.push("/login");
  };
  const handleLogin = () => {
    history.push("/login");
  };
  function toRoot() {
    history.push("/");
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>version: 0.5.3</div>
      <Divider />
      <List>{user_id !== null && <MyGroupList />}</List>
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
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <div className={classes.header}>
            <Typography variant="h6" noWrap onClick={toRoot}>
              빠띠 믹스
            </Typography>
            <Typography variant="h6" noWrap>
              {user_id === null ? (
                <Button variant="contained" onClick={handleLogin}>
                  Login
                </Button>
              ) : (
                <Button variant="contained" onClick={handleLogout}>
                  Logout
                </Button>
              )}
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
