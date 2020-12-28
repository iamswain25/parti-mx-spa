import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    btn: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ee3543",
      boxShadow: "none",

      minWidth: 242,
      height: 52,
      fontSize: 20,
      fontWeight: "bold",
      color: "#ffffff",
      [theme.breakpoints.down("sm")]: {
        flex: 1,
      },
    },
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: theme.spacing(5),
    },
    stickyContainer: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
      [theme.breakpoints.down("sm")]: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      },
    },
  };
});

export default function StickyBtn() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <a
          href="https://campaigns.kr/campaigns/281"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          className={classes.btn}
        >
          제보하기
        </a>
      </div>
      <div className={classes.stickyContainer}>
        <a
          href="https://campaigns.kr/campaigns/281"
          target="_blank"
          rel="noopener noreferrer"
          color="primary"
          className={classes.btn}
        >
          제보하기
        </a>
      </div>
    </>
  );
}
