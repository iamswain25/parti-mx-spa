import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import usePostDelete from "./usePostDelete";
import { Post } from "../types";
import usePostAnnounce from "./usePostAnnounce";
import usePostDenounce from "./usePostDenounce";
import usePostEdit from "./usePostEdit";
import usePostResolve from "./usePostResolve";
import ShareButtons from "./ShareButtons";
import { useCurrentUser, useRole } from "../store/useGlobalState";
import usePermission from "../store/usePermission";
export default function PostMenu({ post: p }: { post: Post }) {
  const [currentUser] = useCurrentUser();
  const [role] = useRole();
  const isOrganizer = role === "organizer";
  const isClosed = !!p.closed_at;
  const [hasDeletePermission] = usePermission("delete");
  const [hasUpdatePermission] = usePermission("update");
  const isMine = p.created_by === currentUser?.uid;
  const isAnnounced = p.is_announced;
  const isNotice = p.type === "notice";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const remove = usePostDelete(p);
  const announce = usePostAnnounce(p);
  const denounce = usePostDenounce(p);
  const resolve = usePostResolve(p);
  const edit = usePostEdit(p);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [];
  if (hasUpdatePermission || isMine) {
    menuItems.push(
      <MenuItem onClick={edit} key={1}>
        수정하기
      </MenuItem>,
    );
  }
  if (hasDeletePermission || isMine) {
    menuItems.push(
      <MenuItem onClick={remove} key={2}>
        삭제하기
      </MenuItem>,
    );
  }
  if (!isClosed && isOrganizer) {
    menuItems.push(
      <MenuItem onClick={resolve} key={5}>
        토론 정리
      </MenuItem>,
    );
  }
  if (isNotice && isOrganizer) {
    if (isAnnounced) {
      menuItems.push(
        <MenuItem onClick={denounce} key={3}>
          공지 내리기
        </MenuItem>,
      );
    } else {
      menuItems.push(
        <MenuItem onClick={announce} key={4}>
          공지 올리기
        </MenuItem>,
      );
    }
  }
  menuItems.push(
    <MenuItem key={6}>
      <ShareButtons post={p} />
    </MenuItem>,
  );
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
        onClick={handleClose}
      >
        {menuItems}
      </Menu>
    </>
  );
}
