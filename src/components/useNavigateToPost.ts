import { useMutation } from "@apollo/client";
import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../store/store";
import { useHistory } from "react-router-dom";

export default function useNavigateToPost() {
  const { push } = useHistory();
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserPostCheck);

  function navigateHandler(post_id: number) {
    if (!!user_id) {
      increment({
        variables: { user_id, post_id },
      });
    }
    push("/suggestion/" + post_id);
  }

  return navigateHandler;
}
