import { Comment } from "../types";

export function getAttitude(comment: Comment) {
  const { user, post } = comment;
  if (user?.checkedPosts?.[0]?.like_count) {
    if (post?.board?.type === "event") {
      return "참석";
    } else if (post?.board?.type === "suggestion") {
      return "동의";
    } else {
      return "동의";
    }
  } else if (user?.votes?.length) {
    if (post?.metadata.isAnonymous !== true) {
      return user.votes.map((v) => v?.candidate.body).join(",");
    }
  }
  return null;
}
