import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { useParams } from "react-router-dom";
import usePostDelete from "./usePostDelete";
import { Post, NoticeMetadata } from "../types";
import { useStore } from "../store/store";
import usePostAnnounce from "./usePostAnnounce";
import usePostDenounce from "./usePostDenounce";
import usePostEdit from "./usePostEdit";
export default function PostMenu({ post: p }: { post: Post }) {
  const { post_id } = useParams();
  const [{ user_id }] = useStore();
  const postId = Number(post_id);
  const [user] = p?.board?.group?.users || [null];
  const status = user?.status;
  const isMine = user_id && p?.createdBy?.id === user_id;
  const isOrganizer = status === "organizer";
  const metadata = p?.metadata as NoticeMetadata;
  const isAnnounced = metadata?.announcement;
  const isNotice = p?.board?.type === "notice";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const remove = usePostDelete(postId);
  const announce = usePostAnnounce(postId);
  const denounce = usePostDenounce(postId);
  const edit = usePostEdit(postId);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [];
  if (isMine) {
    menuItems.push(
      <MenuItem onClick={edit} key={1}>
        수정하기
      </MenuItem>
    );
    menuItems.push(
      <MenuItem onClick={remove} key={2}>
        삭제하기
      </MenuItem>
    );
  }
  if (isNotice && isOrganizer) {
    if (isAnnounced) {
      menuItems.push(
        <MenuItem onClick={denounce} key={3}>
          공지 내리기
        </MenuItem>
      );
    } else {
      menuItems.push(
        <MenuItem onClick={announce} key={4}>
          공지 올리기
        </MenuItem>
      );
    }
  }
  if (!menuItems.length) {
    return <div style={{ width: 48, height: 48 }} />;
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
        {menuItems}
      </Menu>
    </>
  );
}
