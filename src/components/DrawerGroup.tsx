import React from "react";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
import { useStore } from "../store/store";
import { Box } from "@material-ui/core";
import MyGroupList from "./MyGroupList";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme: Theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 24,
    height: 24,
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
    return <Box className={classes.menuButton} />;
  }
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  function navigateGroupHandler(group_id: number) {
    dispatch({ type: "SET_GROUP", group_id });
    setMobileOpen(false);
    history.push("/");
  }

  return (
    <Box color="inherit">
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        className={classes.menuButton}
      >
        <MenuIcon />
        <nav aria-label="groups">
          <Hidden mdUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
            >
              <Box>version: 0.5.3</Box>
              <Divider />
              <List>
                <MyGroupList clickHandler={navigateGroupHandler} />
              </List>
            </Drawer>
          </Hidden>
        </nav>
      </IconButton>
    </Box>
  );
}
