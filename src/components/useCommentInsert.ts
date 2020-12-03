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
    const { post_id, body, parent_id } = args;
    if (post_id) {
      let col = parent_id
        ? firestore
            .collection("posts")
            .doc(post_id)
            .collection("comments")
            .doc(parent_id)
            .collection("comments")
        : firestore.collection("posts").doc(post_id).collection("comments");
      const variables = {
        body,
        post_id,
        parent_id,
        updated_at: new Date(),
        created_at: new Date(),
        created_by: currentUser?.uid,
        updated_by: currentUser?.uid,
        name: currentUser?.displayName || "익명",
        photo_url: currentUser?.photoURL || null,
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
