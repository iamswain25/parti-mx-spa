import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { HomeGroup } from "../types";
import { useQuery, useMutation } from "@apollo/client";
import { queryBoardsByGroupId } from "../graphql/query";
import { useStore } from "../store/store";
import useLoadingEffect from "./useLoadingEffect";
import useErrorEffect from "./useErrorEffect";
import Forbidden from "./Forbidden";
import SelectBoardPermission from "./SelectBoardPermission";
import { updateBoardPermission } from "../graphql/mutation";
const useStyles = makeStyles((theme) => ({
  root: {
    "& div": {
      display: "flex",
      alignItems: "center",
    },
  },
  btn: {
    marginTop: theme.spacing(5),
  },
  ml: {
    marginLeft: theme.spacing(2),
  },
  bb: {
    borderBottom: "1px solid " + theme.palette.grey[300],
  },
}));
export default function BoardsSetting() {
  const classes = useStyles();
  const [{ group_id }] = useStore();
  const { data, error, loading } = useQuery<HomeGroup>(queryBoardsByGroupId, {
    variables: { group_id },
  });
  const [updatePermission] = useMutation(updateBoardPermission);

  useLoadingEffect(loading);
  useErrorEffect(error);
  const group = data?.mx_groups_by_pk;
  if (loading) {
    return null;
  }
  if (!group) {
    return <Forbidden />;
  }

  return (
    <Container component="main" className={classes.root}>
      <Typography>
        {group.boards.map((b, i) => {
          const postCount = b?.posts_aggregate?.aggregate?.count || 0;
          return (
            <Grid
              container
              alignItems="center"
              justify="space-between"
              key={i}
              className={classes.bb}
            >
              <div>
                {b.title}({b.body})
              </div>
              <div>
                <SelectBoardPermission board={b} update={updatePermission} />
                <div className={classes.ml}>
                  {postCount > 0 ? (
                    <div>{postCount}개의 포스트</div>
                  ) : (
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </div>
              </div>
            </Grid>
          );
        })}
      </Typography>
      <Button className={classes.btn}>
        <AddIcon />
        게시판 추가
      </Button>
    </Container>
  );
}
