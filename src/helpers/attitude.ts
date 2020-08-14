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
        return "참석";
      case "suggestion":
        return "동의";
      case "notice":
        return "Like";
      case "vote":
        return "투표완료";
      default:
        return "동의";
    }
  }

  return null;
}
