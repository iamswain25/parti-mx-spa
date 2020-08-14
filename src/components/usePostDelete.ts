import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { deletePost } from "../graphql/mutation";
import useErrorEffect from "./useErrorEffect";

export default function usePostDelete(id: number) {
  const { push } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [del, { loading, error }] = useMutation(deletePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler() {
    try {
      const res = await del();
      const board_id = res.data?.delete_mx_posts_by_pk.board_id;
      const type = res.data?.delete_mx_posts_by_pk?.board?.type;
      if (board_id) {
        setSuccess("Deleted");
        if (type === "suggestion") {
          push("/photo/" + board_id);
        } else {
          push("/home/" + board_id);
        }
      }
    } catch (error) {}
  }

  return function () {
    if (
      window.confirm("Are you sure to delete? It will be unable to recover.")
    ) {
      handler();
    }
  };
}
