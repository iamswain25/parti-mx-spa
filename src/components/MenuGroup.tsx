import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Group } from "../types";
import { useHistory } from "react-router-dom";
import useGroupExit from "./useGroupExit";
export default function MenuGroup({ group }: { group: Group }) {
  const [{ status }] = group?.users || [{ status: null }];
  const isOrg = status === "organizer";
  const isUser = status === "user";
  const { push } = useHistory();
  const exitGroup = useGroupExit();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function boardHandler() {
    push("/boards");
  }
  if (!(isOrg || isUser)) {
    return null;
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="back"
        edge="start"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {isOrg && <MenuItem onClick={boardHandler}>게시판 수정</MenuItem>}
        <MenuItem onClick={exitGroup}>그룹 탈퇴</MenuItem>
      </Menu>
    </>
  );
}
