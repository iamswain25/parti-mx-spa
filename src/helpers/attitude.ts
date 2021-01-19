import { Post } from "../types";
export function getAttitude(post: Post) {
  // if (user?.votes?.length) {
  //   if (post?.metadata.is_anonymous !== true) {
  //     return user.votes.map((v) => v?.candidate.body).join(",");
  //   }
  // }
  switch (post.type) {
    case "suggestion":
      return "동의";
    case "vote":
      return "투표완료";
    case "event":
    case "notice":
    default:
      return "공감";
  }
}
