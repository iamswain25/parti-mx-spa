import React from "react";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { useCurrentUser } from "../store/useGlobalState";
import DrawerBoards from "./DrawerBoards";
const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 24,
  },
  drawer: {
    width: "100%",
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
    },
  },
}));
export default function DrawerGroup() {
  const [currentUser] = useCurrentUser();
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  if (!currentUser) {
    return <div className={classes.menuButton} />;
  }
  const handleDrawerOpen = () => {
    setMobileOpen(true);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

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
        <DrawerBoards close={handleDrawerClose} />
      </Drawer>
    </>
  );
}
