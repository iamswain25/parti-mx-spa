import { Post } from "../types";
export function getAttitude(post: Post) {
  // if (user?.votes?.length) {
  //   if (post?.metadata.isAnonymous !== true) {
  //     return user.votes.map((v) => v?.candidate.body).join(",");
  //   }
  // }
  switch (post.type) {
    case "event":
      return "공감";
    case "suggestion":
      return "동의";
    case "notice":
      return "공감";
    case "vote":
      return "투표완료";
    default:
      return "동의";
  }
}
