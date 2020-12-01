import React from "react";
import { IconButton, Avatar } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useCurrentUser } from "../store/useGlobalState";
export default function MenuProfile() {
  const [currentUser] = useCurrentUser();
  const history = useHistory();
  function profileHandler() {
    history.push("/profile");
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="profile"
        edge="start"
        onClick={profileHandler}
        size="small"
      >
        <Avatar src={currentUser?.photoURL || ""} />
      </IconButton>
    </>
  );
}
