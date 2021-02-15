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
import ShareButtons from "./ShareButtons";
import useDesktop from "./useDesktop";
export default function PostMenu({ post: p }: { post: Post }) {
  const { post_id } = useParams<{ post_id: string }>();
  const [{ user_id }] = useStore();
  const [isDesktop] = useDesktop();
  const postId = Number(post_id);
  const status = p?.board?.group?.status;
  const isMine = user_id && p?.createdBy?.id === user_id;
  const isOrganizer = status === "organizer";
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
  if (isMine) {
    if (!isClosed) {
      menuItems.push(
        <MenuItem onClick={edit} key={1}>
          수정하기
        </MenuItem>
      );
    }
    if (!isClosed || isOrganizer) {
      menuItems.push(
        <MenuItem onClick={remove} key={2}>
          삭제하기
        </MenuItem>
      );
    }
  }
  if (isMine || isOrganizer) {
    if (isManualClosingVote && !isClosed) {
      menuItems.push(
        <MenuItem onClick={resolve} key={5}>
          토론 정리
        </MenuItem>
      );
    }
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
  if (!isDesktop) {
    menuItems.push(
      <MenuItem key={6}>
        <ShareButtons post={p} />
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
