import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { announcePost } from "../graphql/mutation";
interface AnnouncePost {
  update_mx_posts_by_pk: { board_id: number };
}
export default function usePostAnnounce(id: number) {
  const { push } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [announce, { loading }] = useMutation<AnnouncePost>(announcePost, {
    variables: { id },
  });
  useLoadingEffect(loading);

  async function handler() {
    const res = await announce();
    const board_id = res.data?.update_mx_posts_by_pk.board_id;
    if (board_id) {
      setSuccess("important notice");
      push("/home/" + board_id);
    }
  }
  return function () {
    if (window.confirm("make it an important notice")) {
      handler();
    }
  };
}
