import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { useStore } from "../store/store";
import MyGroupList from "./MyGroupList";
import { useHistory } from "react-router-dom";
const DRAWER_WIDTH = 304;
const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 24,
    height: 24,
  },
  drawer: {
    width: DRAWER_WIDTH,
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
    },
  },
}));
export default function DrawerGroup() {
  const [{ user_id }] = useStore();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const [, dispatch] = useStore();
  const history = useHistory();
  if (!user_id) {
    return <div className={classes.menuButton} />;
  }
  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  function navigateGroupHandler(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    setMobileOpen(false);
    history.push("/");
  }

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerOpen}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="temporary"
        anchor={theme.direction === "rtl" ? "right" : "left"}
        open={mobileOpen}
        classes={{ paper: classes.drawer }}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <MyGroupList clickHandler={navigateGroupHandler} />
      </Drawer>
    </>
  );
}
