import { useHistory } from "react-router-dom";

export default function usePostEdit(post_id?: string) {
  const { push } = useHistory();

  function navigateHandler() {
    push("/edit/" + post_id);
  }

  return navigateHandler;
}
