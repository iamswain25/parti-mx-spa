import React from "react";
import { queryReport } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import { downloadFileDirectly } from "../helpers/download";
import { Link } from "react-router-dom";
import usePermEffect from "./usePermEffect";
import Forbidden from "./Forbidden";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& a": {
        textDecoration: "underline",
      },
    },
    item: {
      overflow: "auto",
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: "center",
      flexDirection: "column",
      color: theme.palette.text.secondary,
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
    },
  };
});

export default function Report() {
  const classes = useStyles();
  const userStatus = usePermEffect();
  const { data, loading, error } = useQuery(queryReport);
  if (loading) return <div>loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (!(userStatus && userStatus === "organizer")) {
    return <Forbidden />;
  }
  return (
    <div className={classes.root}>
      {data?.mx_posts?.map((p: any, i: number) => {
        return (
          <Grid container key={i}>
            <Grid container item xs={1} className={classes.item}>
              <Paper elevation={0} className={classes.paper}>
                {i + 1}
              </Paper>
            </Grid>
            <Grid container item xs={1} className={classes.item}>
              <img src={p.images?.[0].uri} alt={p.images?.[0]?.name} />
            </Grid>
            <Grid container item xs={2} className={classes.item}>
              <Paper elevation={0} className={classes.paper}>
                <Link to={`/post/${p.id}`}>{p.title}</Link>
              </Paper>
            </Grid>
            <Grid
              container
              item
              xs={4}
              direction="column"
              className={classes.item}
            >
              <Paper elevation={0} className={classes.paper}>
                {p?.files?.map((f: any, i: number) => (
                  <Grid container item key={i} className={classes.item}>
                    <button onClick={() => downloadFileDirectly(f.uri, f.name)}>
                      {f.name}
                    </button>
                    ({new Date(f.uploadDate).toLocaleString()})
                  </Grid>
                ))}
              </Paper>
            </Grid>
            <Grid container item xs={3} className={classes.item}>
              <Paper elevation={0} className={classes.paper}>
                <div>{p.user.name}</div>
                <div>{p.user.email}</div>
                <div>{JSON.stringify(p.user.metadata)}</div>
              </Paper>
            </Grid>
            <Grid container item xs={1} className={classes.item}>
              <Paper elevation={0} className={classes.paper}>
                {/* {JSON.stringify()} */}
                {p.metadata?.address}
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
