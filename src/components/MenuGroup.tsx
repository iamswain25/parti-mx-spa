import React from "react";
import { IconButton, makeStyles, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Group } from "../types";
import { NavLink } from "react-router-dom";
import useGroupExit from "./useGroupExit";
import useGroupDelete from "../store/useGroupDelete";
import { useCurrentUser, useGroupId, useRole } from "../store/useGlobalState";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .active": {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));
export default function MenuGroup({ group }: { group: Group }) {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const userId = currentUser?.uid;
  const [groupId] = useGroupId();
  const [role] = useRole();
  const isMine = userId === group.created_by;
  const handleClose = () => {
    setAnchorEl(null);
  };
  const exitGroup = useGroupExit(handleClose);
  const deleteGroup = useGroupDelete();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const menus = [];
  switch (role) {
    case "organizer":
      menus.push(
        <MenuItem
          key="edit"
          component={NavLink}
          onClick={handleClose}
          to={`/${groupId}/edit`}
          activeClassName="active"
        >
          그룹 정보 수정
        </MenuItem>,
        <MenuItem
          key="members"
          component={NavLink}
          onClick={handleClose}
          to={`/${groupId}/members`}
          activeClassName="active"
        >
          회원 관리
        </MenuItem>,
        <MenuItem
          key="boards"
          component={NavLink}
          onClick={handleClose}
          to={`/${groupId}/boards`}
          activeClassName="active"
        >
          게시판 수정
        </MenuItem>
      );
      break;
    case "member":
    case "user":
      menus.push(
        <MenuItem key="exit" onClick={exitGroup}>
          그룹 탈퇴
        </MenuItem>
      );
  }
  if (isMine) {
    menus.push(
      <MenuItem key="delete" onClick={deleteGroup}>
        그룹 삭제
      </MenuItem>
    );
  }
  if (!menus.length) {
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
        className={classes.root}
      >
        {menus}
      </Menu>
    </>
  );
}
