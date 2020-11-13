import React from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShareButtons from "../components/ShareButtons";

export default function PostMenu(args) {
  const isOrganizer = args.isOrganizer;
  const isClosed = !!args.closed_at;
  const isMine = args.created_by === "currentUser";
  const isAnnounced = args.is_announced;
  const isNotice = args.type === "notice";
  const isSuggestion = args.type === "suggestion";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const menuItems = [];
  if (isSuggestion || isOrganizer || isMine) {
    menuItems.push(
      <MenuItem key={1}>
        수정하기
      </MenuItem>
    );
    menuItems.push(
      <MenuItem key={2}>
        삭제하기
      </MenuItem>
    );
  }
  if (!isClosed && isOrganizer && args.type !== "event") {
    menuItems.push(
      <MenuItem key={5}>
        토론 정리
      </MenuItem>
    );
  }
  if (isNotice && isOrganizer) {
    if (isAnnounced) {
      menuItems.push(
        <MenuItem key={3}>
          공지 내리기
        </MenuItem>
      );
    } else {
      menuItems.push(
        <MenuItem key={4}>
          공지 올리기
        </MenuItem>
      );
    }
  }
  menuItems.push(
    <MenuItem key={6}>
      <ShareButtons post={args.post} />
    </MenuItem>
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
      >
        {menuItems}
      </Menu>
    </>
  );
}
