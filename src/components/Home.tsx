import React from "react";
import { useStore } from "../store/store";
import { queryByGroupId } from "../graphql/query";
import useNavigateToPost from "./useNavigateToPost";
import { HomeGroup } from "../types";
import { useQuery } from "@apollo/client";
import { makeStyles } from "@material-ui/core/styles";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
const useStyles = makeStyles((theme) => {
  return {
    root: {
      "& img": {
        height: 200,
      },
    },
  };
});
export default function Home() {
  const [{ user_id, group_id = 34 }] = useStore();
  const classes = useStyles();
  const navigatePost = useNavigateToPost();
  const { data, error, loading } = useQuery<HomeGroup>(queryByGroupId, {
    variables: { group_id, user_id, isAnonymous: user_id === null },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  const { boards = [], title, bg_img_url } = data?.mx_groups_by_pk ?? {};

  return (
    <div className={classes.root}>
      <h1>{title}</h1>
      <img src={bg_img_url} alt="group background" />
      <ul>
        {boards.map((b, i) => {
          return (
            <li key={i}>
              <h2>{b.title}</h2>
              <h3>{b.body}</h3>
              <div>{b.type}</div>
              <div>{b.last_posted_at}</div>
              <ul>
                {b.posts.map((p, i) => {
                  return (
                    <li key={i} onClick={() => navigatePost(p.id)}>
                      <h4>{p.title}</h4>
                      <h5>{p.body}</h5>
                      <div>{p.createdBy.name}</div>
                      <div>{p.created_at}</div>
                      <div>{p.comments_aggregate.aggregate.count}</div>
                      <div>{p.users_aggregate.aggregate.sum.like_count}</div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
