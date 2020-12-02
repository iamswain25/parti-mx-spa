import { Post } from "../types";
export function getAttitude(post: Post) {
  // if (user?.votes?.length) {
  //   if (post?.metadata.isAnonymous !== true) {
  //     return user.votes.map((v) => v?.candidate.body).join(",");
  //   }
  // }
  switch (post.type) {
    case "suggestion":
      return "응원해요";
    case "vote":
      return "투표완료";
    case "event":
    case "notice":
    default:
      return "공감";
  }
}
