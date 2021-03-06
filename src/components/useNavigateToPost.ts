import { useMutation } from "@apollo/client";
import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../store/store";
import { useHistory } from "react-router-dom";

export default function useNavigateToPost(post_id?: number) {
  const { push } = useHistory();
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserPostCheck);

  function navigateHandler() {
    if (!!user_id) {
      increment({
        variables: { user_id, post_id },
      });
    }
    push("/post/" + post_id);
  }

  return navigateHandler;
}
