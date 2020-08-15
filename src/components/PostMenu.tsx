import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import usePostDelete from "./usePostDelete";
import { Post } from "../types";
import { useStore } from "../store/store";
import usePostAnnounce from "./usePostAnnounce";
import usePostDenounce from "./usePostDenounce";
import usePostEdit from "./usePostEdit";
import usePostResolve from "./usePostResolve";
import { useGlobalState, keys } from "../store/useGlobalState";
export default function PostMenu({ post: p }: { post: Post }) {
  const [userStatus] = useGlobalState(keys.PERMISSION);
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const postId = Number(post_id);
  const isMine = user_id && p?.createdBy?.id === user_id;
  const isOrganizer = userStatus === "organizer";
  const isClosed = !!p?.closed_at;
  const isAnnounced =
    "announcement" in p?.metadata ? p?.metadata?.announcement : false;
  const isNotice = p?.board?.type === "notice";
  const isManualClosingVote =
    "closingMethod" in p?.metadata
      ? p?.board?.type === "vote" && p?.metadata?.closingMethod === "manual"
      : false;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const remove = usePostDelete(postId);
  const announce = usePostAnnounce(postId);
  const denounce = usePostDenounce(postId);
  const resolve = usePostResolve(postId);
  const edit = usePostEdit(postId);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [];
  if (isClosed) {
    return null;
  }
  if (isMine) {
    menuItems.push(
      <MenuItem onClick={edit} key={1}>
        Edit
      </MenuItem>
    );
    menuItems.push(
      <MenuItem onClick={remove} key={2}>
        Delete
      </MenuItem>
    );
  }
  if (isNotice && isOrganizer) {
    if (isAnnounced) {
      menuItems.push(
        <MenuItem onClick={denounce} key={3}>
          cancel notice
        </MenuItem>
      );
    } else {
      menuItems.push(
        <MenuItem onClick={announce} key={4}>
          important notice
        </MenuItem>
      );
    }
  }
  if (isManualClosingVote) {
    menuItems.push(
      <MenuItem onClick={resolve} key={5}>
        토론 정리
      </MenuItem>
    );
  }
  if (!menuItems.length) {
    return <div />;
  }
  return (
    <>
      <IconButton color="inherit" aria-label="back" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems}
      </Menu>
    </>
  );
}
