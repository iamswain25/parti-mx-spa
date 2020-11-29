import React from "react";
import { Board, ChipData } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import usePosts from "../store/usePosts";
import FilterListIcon from "@material-ui/icons/FilterList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import Chips from "./Chips";
import {
  CUTTING_INDEX,
  DEFAULT_HASHTAGS,
  KEYWORD_INDEX,
} from "../helpers/options";
import HomeBoardPhoto from "./HomeBoardPhoto";
import { Grid, LinearProgress } from "@material-ui/core";
import useDesktop from "./useDesktop";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: theme.palette.grey[50],
      position: "absolute",
      width: "100%",
      left: 0,
      zIndex: 2,
      "&>.title": {
        borderTop: "1px solid " + theme.palette.grey[300],
        "&>div": {
          [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2),
            fontSize: 18,
          },
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
          [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(0),
            paddingRight: theme.spacing(0),
          },
          paddingLeft: 30,
          paddingRight: 30,
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1200,
          "&>.svg": {
            width: 16,
            height: 16,
            color: "#8f8abf",
            [theme.breakpoints.down("sm")]: {
              borderLeft: "none",
            },
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
            [theme.breakpoints.down("sm")]: {
              paddingLeft: theme.spacing(1),
              paddingRight: theme.spacing(1),
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            color: theme.palette.grey[900],
            backgroundColor: "transparent",
            "&.selected": {
              fontWeight: "bold",
              color: theme.palette.primary.main,
            },
            "&:last-child": {
              flex: 1,
              borderRight: "none",
              [theme.breakpoints.up("md")]: {
                justifyContent: "flex-start",
              },
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
          // justifyContent: "center",/ n,
          "&.hide": {
            display: "none",
          },
          minHeight: 111,
          paddingLeft: 30,
          paddingRight: 30,
          [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
          },
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 1200,
        },
      },
    },
    container: {
      paddingTop: 190,
      paddingBottom: theme.spacing(2),
      display: "flex",
      [theme.breakpoints.down("sm")]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: 140,
      },
    },
  };
});
type Filter = "type" | "area" | "keyword" | "cancel" | "hide";
const defaultTags: ChipData[] = DEFAULT_HASHTAGS.map((tag) => ({
  selected: false,
  label: tag,
}));

export default function RouteBoardSuggestion({ board: b }: { board: Board }) {
  const classes = useStyles();
  const [isDesktop] = useDesktop();
  const [filter, setFilter] = React.useState<Filter>("hide");
  const [chips, setChips] = React.useState<ChipData[]>(defaultTags);
  const selectedTags = React.useMemo(
    () => chips.filter((c) => c.selected).map((c) => c.label),
    [chips]
  );
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
  if (posts === undefined) {
    return <LinearProgress />;
  }
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
              {isDesktop ? "공모분야" : "분야"}
              <ExpandMoreIcon />
            </button>
            <button
              onClick={filterHandler("area")}
              className={filter === "area" ? "active" : undefined}
            >
              지역
              <ExpandMoreIcon />
            </button>
            <button
              onClick={filterHandler("keyword")}
              className={filter === "keyword" ? "active" : undefined}
            >
              키워드
              <ExpandMoreIcon />
            </button>
            <button
              onClick={filterHandler("cancel")}
              className={selectedTags.length ? "selected" : undefined}
            >
              <SettingsBackupRestoreIcon />
              {isDesktop ? "필터 해제" : "해제"}
            </button>
          </div>
        </div>
        <div className="tags">
          <div className={filter}>
            <Chips
              chips={
                filter === "type"
                  ? chips.slice(0, CUTTING_INDEX)
                  : filter === "area"
                  ? chips.slice(CUTTING_INDEX, KEYWORD_INDEX)
                  : chips.slice(KEYWORD_INDEX)
              }
              setChips={setChips}
            />
          </div>
        </div>
      </section>
      <div className={classes.container}>
        <Grid container spacing={isDesktop ? 3 : 0}>
          {posts
            .filter((p) =>
              selectedTags.length
                ? selectedTags.every((tag) => p.tags.includes(tag)) // and 연산
                : // ? p.tags.every((tag) => selectedTags.includes(tag)) // or 연산
                  true
            )
            .map((p) => (
              <HomeBoardPhoto key={p.id} p={p} xs={12} md={4} />
            ))}
        </Grid>
      </div>
    </>
  );
}
