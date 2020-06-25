import { useMutation } from "@apollo/client";
import { incrementUserPostCheck } from "../graphql/mutation";
import { useStore } from "../store/store";

export default function useNavigateToPost() {
  const [{ user_id }] = useStore();
  const [increment] = useMutation(incrementUserPostCheck);

  function navigateHandler(post_id: number) {
    increment({
      variables: { user_id, post_id },
    });
  }
  return navigateHandler;
}
