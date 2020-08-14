import React from "react";
import { IconButton, Menu, makeStyles, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Board } from "../types";
import { useHistory } from "react-router-dom";
import { useStore } from "../store/store";
const useStyles = makeStyles((theme) => {
  return {
    selected: {
      borderBottomWidth: 2,
      borderBottomStyle: "solid",
      borderBottomColor: theme.palette.primary.main,
    },
  };
});
export default function MenuBoard({ boards }: { boards: Board[] }) {
  const { push } = useHistory();
  const classes = useStyles();
  const [{ board_id }] = useStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  function toPage(type: string, board_id: number) {
    push(type === "suggestion" ? `/photo/${board_id}` : `/home/${board_id}`);
  }
  function opencallmain() {
    window.location.replace("https://beyondcovid19-opencall.org");
  }
  return (
    <>
      <IconButton
        color="inherit"
        aria-label="back"
        edge="start"
        onClick={handleClick}
        size="small"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {boards.map((b, i) => (
          <MenuItem
            classes={{ selected: classes.selected }}
            onClick={() => toPage(b.type, b.id)}
            key={i}
            selected={board_id === b.id}
          >
            {b.title}
          </MenuItem>
        ))}
        <MenuItem onClick={opencallmain} key="opencallmain">
          OPENCALL MAIN
        </MenuItem>
      </Menu>
    </>
  );
}
