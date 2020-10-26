import { useHistory } from "react-router-dom";
import { Post } from "../types";

export default function usePostEdit(post: Post) {
  const { push } = useHistory();

  function navigateHandler() {
    push("/edit/" + post.id);
  }

  return navigateHandler;
}
