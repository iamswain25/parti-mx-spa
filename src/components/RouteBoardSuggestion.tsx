import React from "react";
import { Board, ChipData } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import RoutePostSuggestion from "./RoutePostSuggestion";
import usePosts from "../store/usePosts";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Chips from "./Chips";
import { DEFAULT_HASHTAGS } from "../helpers/options";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.grey[50],
      position: "absolute",
      width: "100%",
      "&>.title": {
        borderTop: "1px solid " + theme.palette.grey[300],
        "&>div": {
          paddingLeft: 30,
          paddingRight: 30,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1200,
          fontSize: 24,
          fontWeight: "bold",
          letterSpacing: -0.6,
          color: "#544f85",
          paddingTop: theme.spacing(5),
          paddingBottom: theme.spacing(2.5),
        },
      },
      "&>.category": {
        borderTop: "1px solid " + theme.palette.grey[300],
        borderBottom: "1px solid " + theme.palette.grey[300],
        "&>div": {
          display: "flex",
          paddingLeft: 30,
          paddingRight: 30,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1200,
          "&>.svg": {
            width: 16,
            height: 16,
            color: "#8f8abf",
            padding: 20,
            borderLeft: "1px solid " + theme.palette.grey[300],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "&>button": {
            cursor: "pointer",
            border: "none",
            borderLeft: "1px solid " + theme.palette.grey[300],
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: theme.palette.grey[900],
            backgroundColor: "transparent",
            "&:last-child": {
              justifyContent: "flex-start",
              flex: 1,
              borderRight: "none",
            },
            "&>svg": {
              width: 20,
              height: 20,
              color: theme.palette.grey[600],
            },
            "&.active": {
              backgroundColor: theme.palette.common.white,
            },
          },
        },
      },
      "&>.tags": {
        backgroundColor: theme.palette.common.white,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.2), 0 2px 1px -1px rgba(0, 0, 0, 0.12), 0 1px 1px 0 rgba(0, 0, 0, 0.14)",
        "&>div": {
          display: "flex",
          alignItems: "center",
          // justifyContent: "center",
          "&.hide": {
            display: "none",
          },
          height: 111,
          paddingLeft: 30,
          paddingRight: 30,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1200,
        },
      },
    },
    container: {
      paddingLeft: 30,
      paddingRight: 30,
      marginLeft: "auto",
      marginRight: "auto",
      maxWidth: 1200,
      paddingTop: 150,
      // paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
  };
});
type Filter = "type" | "area" | "cancel" | "hide";
const defaultTags: ChipData[] = DEFAULT_HASHTAGS.map((tag) => ({
  selected: false,
  label: tag,
}));
const CUTTING_INDEX = 4;
export default function RouteBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [filter, setFilter] = React.useState<Filter>("hide");
  const [chips, setChips] = React.useState<ChipData[]>(defaultTags);
  const [posts] = usePosts({ board_id: b.id });
  const filterHandler = React.useCallback(
    (type: Filter) => () => {
      if (type === "cancel") {
        setChips((chips) => chips.map((g) => ({ ...g, selected: false })));
      } else {
        setFilter((originalType) => (originalType === type ? "hide" : type));
      }
    },
    [setFilter, setChips]
  );
  return (
    <>
      <section className={classes.root}>
        <div className="title">
          <div>{b.title}</div>
        </div>
        <div className="category">
          <div>
            <div className="svg">
              <FilterListIcon />
            </div>
            <button
              onClick={filterHandler("type")}
              className={filter === "type" ? "active" : undefined}
            >
              공모분야
              <ExpandMoreIcon />
            </button>
            <button
              onClick={filterHandler("area")}
              className={filter === "area" ? "active" : undefined}
            >
              지역
              <ExpandMoreIcon />
            </button>
            <button onClick={filterHandler("cancel")}>
              <SettingsBackupRestoreIcon /> 필터 해제하기
            </button>
          </div>
        </div>
        <div className="tags">
          <div className={filter}>
            <Chips
              chips={
                filter === "type"
                  ? chips.slice(0, CUTTING_INDEX)
                  : chips.slice(CUTTING_INDEX)
              }
              setChips={setChips}
            />
          </div>
        </div>
      </section>
      <div className={classes.container}>
        {posts.map((p) => (
          <RoutePostSuggestion key={p.id} post={p} />
        ))}
      </div>
    </>
  );
}
