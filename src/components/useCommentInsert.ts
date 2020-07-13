import { insertComment } from "../graphql/mutation";
import { useMutation } from "@apollo/client";
import { CommentInput } from "../types";
export default function useCommentInsert(callback?: any) {
  const [insert] = useMutation(insertComment);
  function formHandler(args: CommentInput, e: any) {
    // return console.log(args);
    const post_id = Number(args.post_id);
    const body = args.body;
    const parent_id = args.parent_id ? Number(args.parent_id) : undefined;
    // return console.log(body, post_id, parent_id);
    if (post_id) {
      insert({
        variables: {
          body,
          post_id,
          parent_id,
        },
      });
      e.target.reset();
      callback && callback();
    }
  }
  return formHandler;
}
