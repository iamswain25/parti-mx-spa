import { Comment } from "../types";

export function getAttitude(comment: Comment) {
  const { user, post } = comment;
  if (user?.votes?.length) {
    if (post?.metadata.isAnonymous !== true) {
      return user.votes.map((v) => v?.candidate.body).join(",");
    }
  }
  if (user?.checkedPosts?.[0]?.like_count) {
    switch (post?.board?.type) {
      case "event":
        return "Attend";
      case "suggestion":
        return "Liked";
      case "notice":
        return "Liked";
      case "vote":
        return "voted";
      default:
        return "Liked";
    }
  }

  return null;
}
