import React from "react";
import { Post } from "../types";
import { Box, Divider, Grid } from "@material-ui/core";
import AvatarNameDate2 from "./AvatarNameDate2";
import usePostLikedUsers from "../store/usePostLikedUsers";

export default function LikedUsers({ post: p }: { post: Post }) {
  const [likedUsers] = usePostLikedUsers(p.id);
  return (
    <div>
      <Box my={2}>
        <Divider />
      </Box>
      <Grid container wrap="wrap" spacing={2}>
        {likedUsers?.map((u) => (
          <AvatarNameDate2 key={u.id} postLike={u} />
        ))}
      </Grid>
    </div>
  );
}
