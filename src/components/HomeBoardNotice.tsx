import React from "react";
// import { useStore } from "../store/store";
// import useNavigateToPost from "./useNavigateToPost";
import { Board } from "../types";
import { makeStyles } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { grey } from "@material-ui/core/colors";
import BoardNoticePost from "./BoardNoticePost";
const useStyles = makeStyles((theme) => {
  return {
    container: { marginBottom: 41 },
    title: {
      height: 24,
      fontFamily: "NotoSansCJKkr",
      fontSize: 20,
      fontWeight: "bold",
      fontStyle: "normal",
      letterSpacing: -0.56,
      color: "rgba(0, 0, 0, 0.87)",
    },
    titleContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: 54,
      borderBottom: `1px solid ${grey[400]}`,
    },
    flexrowleft: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      fontFamily: "NotoSansCJKkr",
      fontSize: 11,
      color: "#757575",
    },
  };
});

export default function HomeBoardNotice({ board: b }: { board: Board }) {
  //   const [{ user_id }] = useStore();
  const classes = useStyles();
  return (
    <section className={classes.container}>
      <div className={classes.titleContainer}>
        <div className={classes.flexrowleft}>
          <h2 className={classes.title}>{b.title}</h2>
          {/* <div>{b.type}</div>
          <h3>{b.body}</h3> */}
        </div>
        <div className={classes.flexrowleft}>
          <div className={classes.label}>더 보기</div>
          <ChevronRightIcon style={{ color: grey[600], fontSize: 16 }} />
        </div>
      </div>
      {/* <div>{b.last_posted_at}</div> */}
      <div>
        {b.posts.map((p, i) => (
          <BoardNoticePost key={i} post={p} />
        ))}
      </div>
    </section>
  );
}
