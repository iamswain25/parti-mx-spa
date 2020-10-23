import React from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import useMe from "../store/useMe";
export default function MenuProfile() {
  const [me] = useMe();
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
        <Avatar src={me?.photo_url} children={me?.name.substr(0, 1)} />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profileHandler}>프로필</MenuItem>
        {me ? <LogoutButton /> : <LoginButton />}
        {/* <AccountDelete /> */}
      </Menu>
    </>
  );
}
