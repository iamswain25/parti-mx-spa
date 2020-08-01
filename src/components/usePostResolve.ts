import { useMutation } from "@apollo/client";
import useLoadingEffect from "./useLoadingEffect";
import { useGlobalState, keys } from "../store/useGlobalState";
import { useHistory } from "react-router-dom";
import { resolvePost } from "../graphql/mutation";
import useErrorEffect from "./useErrorEffect";

export default function usePostResolve(id: number) {
  const { push } = useHistory();
  const [, setSuccess] = useGlobalState(keys.SUCCESS);
  const [mutate, { loading, error }] = useMutation(resolvePost, {
    variables: { id },
  });
  useLoadingEffect(loading);
  useErrorEffect(error);
  async function handler() {
    const res = await mutate();
    const board_id = res.data?.update_mx_posts_by_pk.board_id;
    if (board_id) {
      setSuccess("정리되었습니다.");
      push("/home/" + board_id);
    }
  }

  return function () {
    if (window.confirm("토론을 정리하시겠습니까? ")) {
      handler();
    }
  };
}
