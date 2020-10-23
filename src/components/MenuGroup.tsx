import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Group } from "../types";
import { useHistory } from "react-router-dom";
import useGroupExit from "./useGroupExit";
import useGroupDelete from "../store/useGroupDelete";
import { useCurrentUser } from "../store/useGlobalState";
export default function MenuGroup({ group }: { group: Group }) {
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const status = group?.status;
  const isOrg = status === "organizer";
  const isUser = status === "user";
  const isMine = userId === group.created_by;
  const { push } = useHistory();
  const exitGroup = useGroupExit();
  const deleteGroup = useGroupDelete();
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
  function groupHandler() {
    push("/group/edit");
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
        {isOrg && <MenuItem onClick={groupHandler}>그룹 정보 수정</MenuItem>}
        {isOrg && <MenuItem onClick={boardHandler}>게시판 수정</MenuItem>}
        <MenuItem onClick={exitGroup}>그룹 탈퇴</MenuItem>
        {isMine && <MenuItem onClick={deleteGroup}>그룹 삭제</MenuItem>}
      </Menu>
    </>
  );
}
