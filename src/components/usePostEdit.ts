import { useHistory } from "react-router-dom";

export default function usePostEdit(post_id?: number) {
  const { push } = useHistory();

  function navigateHandler() {
    push("/edit/" + post_id);
  }

  return navigateHandler;
}
