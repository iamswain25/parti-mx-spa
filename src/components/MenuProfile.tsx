import React from "react";
import { IconButton, Menu, MenuItem, Avatar } from "@material-ui/core";
import { User } from "../types";
import { useHistory } from "react-router-dom";
import { useStore } from "../store/store";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
export default function MenuProfile({ user }: { user: User }) {
  const [{ user_id }] = useStore();
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
        <Avatar src={user.photo_url} children={user.name.substr(0, 1)} />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={profileHandler}>Profile Change</MenuItem>
        {user_id ? <LogoutButton /> : <LoginButton />}
      </Menu>
    </>
  );
}
