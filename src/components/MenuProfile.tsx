import React from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useCurrentUser } from "../store/useGlobalState";
export default function MenuProfile() {
  const [currentUser] = useCurrentUser();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  function handleOpen(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }
  function profileHandler() {
    history.push("/profile");
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="profile"
        edge="start"
        onClick={handleOpen}
        size="small"
      >
        <Avatar
          src={currentUser?.photoURL || ""}
          children={currentUser?.displayName?.substr(0, 1)}
        />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profileHandler}>프로필</MenuItem>
        {currentUser ? <LogoutButton /> : <LoginButton />}
        {/* <AccountDelete /> */}
      </Menu>
    </>
  );
}
