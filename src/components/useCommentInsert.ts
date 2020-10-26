import { firestore } from "../config/firebase";
import usePostLiked from "../store/usePostLiked";
import { CommentInput, Post } from "../types";
import { getAttitude } from "../helpers/attitude";
import { useCurrentUser } from "../store/useGlobalState";
export default function useCommentInsert({
  callback,
  post,
}: {
  callback?: any;
  post: Post;
}) {
  const [liked] = usePostLiked(post.id);
  const [currentUser] = useCurrentUser();
  function formHandler(args: CommentInput, e: any) {
    const post_id = args.post_id;
    const body = args.body;
    const password = args.password;
    if (post_id) {
      let col = firestore
        .collection("posts")
        .doc(post_id)
        .collection("comments");
      if (args.parent_id) {
        col = firestore
          .collection("posts")
          .doc(post_id)
          .collection("comments")
          .doc(args.parent_id)
          .collection("comments");
      }
      const variables = {
        body,
        post_id,
        password,
        count_like: 0,
        count_comment: 0,
        count_view: 0,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: currentUser?.uid,
        updated_by: currentUser?.uid,
        name: currentUser?.displayName ?? "익명",
      } as any;
      if (liked) {
        variables.attitude = getAttitude(post);
      }
      col.add(variables);
      e.target.reset();
      callback && callback();
    }
  }
  return formHandler;
}
