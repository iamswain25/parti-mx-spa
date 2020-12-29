import { useHistory } from "react-router-dom";

export default function useNavigateToPost(post_id?: string) {
  const { push } = useHistory();
  function navigateHandler() {
    push("/post/" + post_id);
  }

  return navigateHandler;
}
