import React from "react";
import { Post } from "../types";
import { Box, Button, Divider, Grid, LinearProgress } from "@material-ui/core";
import AvatarNameDate2 from "./AvatarNameDate2";
import usePostLikedUsers from "../store/usePostLikedUsers";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
export default function LikedUsers({ post: p }: { post: Post }) {
  const [likedUsers, loadmore, loading, hasMore] = usePostLikedUsers(p.id);
  return (
    <div>
      <Box my={2}>
        <Divider />
      </Box>
      {hasMore && (
        <Box my={2} display="flex" justifyContent="center">
          <Button variant="outlined" onClick={loadmore}>
            더보기
            <ExpandLessIcon />
          </Button>
        </Box>
      )}
      {loading && <LinearProgress />}
      <Grid container wrap="wrap" spacing={2}>
        {likedUsers?.map((u) => (
          <AvatarNameDate2 key={u.id} postLike={u} />
        ))}
      </Grid>
    </div>
  );
}
