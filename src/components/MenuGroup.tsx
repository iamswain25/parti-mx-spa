import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Group } from "../types";
import { useHistory } from "react-router-dom";
export default function MenuGroup({ group }: { group: Group }) {
  const [{ status }] = group?.users || [{ status: null }];
  const isOrganizer = status === "organizer";
  const { push } = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function handler() {}
  function boardHandler() {
    push("/boards");
  }
  if (!isOrganizer) {
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
        <MenuItem onClick={boardHandler}>게시판 수정</MenuItem>
        <MenuItem onClick={handler}>그룹 탈퇴</MenuItem>
      </Menu>
    </>
  );
}
